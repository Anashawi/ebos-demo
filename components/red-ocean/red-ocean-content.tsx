import { useEffect, useState } from "react";

import * as productsApi from "../../http-client/products.client";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { productPagesEnum } from "../../models/enums";
import { IProduct } from "../../models/types";
import { IUserProduct } from "../../models/user-product";

import FormikContextChild from "../products/formik-context-child";
import RedOceanProduct from "./product";
import Spinner from "../common/spinner";
import ZeroProductsWarning from "../common/zero-products-warning";
import ZeroProductCompetitorsWarning from "../common/zero-product-competitors-warning";
import GoNextButton from "../common/go-next-button";
import Chat from "../common/openai-chat/openai-chat";
import { stepFourTranscript } from "../common/openai-chat/openai-transcript";
import { getRedOceanMessage } from "../common/openai-chat/custom-messages";

import { FieldArray, Form, Formik } from "formik";
import { string, object, array } from "yup";
import { cloneDeep } from "lodash";

interface Props {
    userProduct: IUserProduct;
    dispatchChartProducts: (products: IProduct[]) => void;
    isLoading: boolean;
}

const RedOceanContent = ({
    userProduct,
    dispatchChartProducts,
    isLoading,
}: Props) => {
    const queryClient = useQueryClient();

    const [chatGPTMessage, setChatGPTMessage] = useState<string>("");
    // on data load send ChatGPT transcript with data
    useEffect(() => {
        if (!isLoading && userProduct.id) {
            const combinedMsg = `${stepFourTranscript}\n\n${getRedOceanMessage(
                userProduct
            )}`;
            setChatGPTMessage(combinedMsg);
        }
    }, [isLoading, userProduct]);

    const { mutate: updateUserProduct, isLoading: isUpdatingUserProduct } =
        useMutation(
            (userProduct: IUserProduct) => {
                return productsApi.updateOne(
                    userProduct,
                    productPagesEnum.factors
                );
            },
            {
                onMutate: newProducts => {
                    queryClient.setQueryData(
                        [productsApi.Keys.UserProduct, userProduct.id],
                        newProducts
                    );
                    setChatGPTMessage(getRedOceanMessage(newProducts));
                },
                onSuccess: storedProducts => {
                    queryClient.invalidateQueries([
                        productsApi.Keys.UserProduct,
                        userProduct.id,
                    ]);
                    queryClient.invalidateQueries([productsApi.Keys.All]);
                },
            }
        );

    return (
        <>
            <section className="form-container">
                <h3 className="title-header">Red Ocean Canvas</h3>
                <Formik
                    initialValues={{
                        products: userProduct.products,
                    }}
                    validationSchema={object({
                        products: array(
                            object({
                                factors: array(
                                    object({
                                        name: string().required("required"),
                                    })
                                )
                                    .required(
                                        "Must provide at least one factor !"
                                    )
                                    .min(
                                        1,
                                        "Must provide at least one factor !"
                                    ),
                            })
                        ),
                    })}
                    onSubmit={async (values, actions) => {
                        values.products?.map(product => {
                            if (!product.uuid) {
                                product.uuid = crypto.randomUUID();
                            }
                        });
                        if (userProduct?.id) {
                            userProduct.products = values.products;
                            await updateUserProduct({
                                ...userProduct,
                            });
                        }
                        actions.setSubmitting(false);
                    }}
                    enableReinitialize
                    validateOnMount
                >
                    {({ values, isSubmitting, isValid, errors }) => {
                        return (
                            <Form>
                                <FieldArray name="products">
                                    {({ push, remove }) => {
                                        return (
                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-col gap-2">
                                                    {isLoading && (
                                                        <Spinner
                                                            className="flex items-center text-2xl"
                                                            message="Loading Red Ocean..."
                                                        />
                                                    )}
                                                    {!isLoading &&
                                                        userProduct.products
                                                            .length === 0 && (
                                                            <ZeroProductsWarning />
                                                        )}
                                                    {!isLoading &&
                                                        values.products
                                                            .length === 0 &&
                                                        userProduct.products
                                                            .length > 0 && (
                                                            <p className="text-rose-400">
                                                                make a selection
                                                                to view products
                                                                !
                                                            </p>
                                                        )}
                                                    {values.products.length >
                                                        0 &&
                                                        values.products.map(
                                                            (
                                                                product,
                                                                productIndex
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        productIndex
                                                                    }
                                                                >
                                                                    {!!product
                                                                        .competitors
                                                                        ?.length && (
                                                                        <RedOceanProduct
                                                                            product={
                                                                                product
                                                                            }
                                                                            index={
                                                                                productIndex
                                                                            }
                                                                        />
                                                                    )}
                                                                    {!product
                                                                        .competitors
                                                                        ?.length && (
                                                                        <>
                                                                            <h3 className="text-[1.75rem] font-hero-semibold">
                                                                                {
                                                                                    product.name
                                                                                }
                                                                            </h3>
                                                                            <ZeroProductCompetitorsWarning />
                                                                        </>
                                                                    )}
                                                                </div>
                                                            )
                                                        )}
                                                </div>
                                                <div className="flex justify-end h-10">
                                                    {isUpdatingUserProduct && (
                                                        <Spinner
                                                            className="flex items-center text-xl"
                                                            message="Saving Red Ocean"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex gap-4 justify-end">
                                                    <button
                                                        type="submit"
                                                        className={
                                                            isLoading ||
                                                            isUpdatingUserProduct ||
                                                            isSubmitting ||
                                                            !isValid
                                                                ? "btn-rev btn-disabled"
                                                                : "btn-rev"
                                                        }
                                                        disabled={
                                                            isUpdatingUserProduct ||
                                                            isSubmitting ||
                                                            !isValid
                                                        }
                                                    >
                                                        Save
                                                    </button>
                                                    <GoNextButton
                                                        stepUri={`../org/disruption`}
                                                        nextStepTitle={`Disruption`}
                                                        clickable={
                                                            userProduct.products
                                                                .length > 0
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        );
                                    }}
                                </FieldArray>

                                <FormikContextChild
                                    dispatch={values => {
                                        dispatchChartProducts(
                                            cloneDeep(values.products)
                                        );
                                    }}
                                />
                            </Form>
                        );
                    }}
                </Formik>
            </section>
            <Chat initialMessage={chatGPTMessage}></Chat>
        </>
    );
};

export default RedOceanContent;
