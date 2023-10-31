import { useState } from "react";
import { useRouter } from "next/router";
import * as clientApi from "../../http-client/products.client";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { productPagesEnum } from "../../models/enums";
import { IProduct } from "../../models/types";
import { IUserProduct } from "../../models/user-product";

import FormikContextChild from "../products/formik-context-child";
import RedOceanProduct from "../../components/red-ocean/product";
import Spinner from "../../components/common/spinner";
import ZeroProductsWarning from "../../components/common/zero-products-warning";
import ZeroProductCompetitorsWarning from "../common/zero-product-competitors-warning";
import Chat from "../../components/common/openai-chat/openai-chat";
import { stepFour } from "../../components/common/openai-chat/openai-transcript";

import { FieldArray, Form, Formik } from "formik";
import { string, object, array } from "yup";
import { cloneDeep } from "lodash";
import { getRedOceanMessage } from "../common/openai-chat/custom-messages";

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
    const router = useRouter();

    const queryClient = useQueryClient();

    const [chatGPTMessage, setChatGPTMessage] = useState<string>(stepFour);

    const { mutate: updateUserProduct, isLoading: isUpdatingUserProduct } =
        useMutation(
            (userProduct: IUserProduct) => {
                return clientApi.updateOne(
                    userProduct,
                    productPagesEnum.factors
                );
            },
            {
                onMutate: updated => {
                    queryClient.setQueryData(
                        [clientApi.Keys.UserProduct, userProduct.id],
                        updated
                    );
                    setChatGPTMessage(getRedOceanMessage(updated));
                },
                onSuccess: updated => {
                    queryClient.invalidateQueries([
                        clientApi.Keys.UserProduct,
                        userProduct.id,
                    ]);
                    queryClient.invalidateQueries([clientApi.Keys.All]);
                },
            }
        );

    return (
        <>
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
                                .required("Must provide at least one factor !")
                                .min(1, "Must provide at least one factor !"),
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
                                        <>
                                            <div className="flex flex-col gap-20">
                                                {!isLoading &&
                                                    !userProduct.products
                                                        ?.length && (
                                                        <ZeroProductsWarning />
                                                    )}

                                                {!isLoading &&
                                                    !values.products?.length &&
                                                    !!userProduct.products
                                                        ?.length && (
                                                        <p className="text-rose-400">
                                                            make a selection to
                                                            view products !
                                                        </p>
                                                    )}
                                                {isLoading && (
                                                    <Spinner
                                                        className="flex items-center text-2xl"
                                                        message="Loading Red Ocean..."
                                                    />
                                                )}
                                                {!!values.products?.length &&
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
                                            <div className="mt-10">
                                                <div className="h-10">
                                                    {isUpdatingUserProduct && (
                                                        <Spinner
                                                            className="flex items-center text-xl"
                                                            message="Saving Red Ocean"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex gap-5 justify-between items-center">
                                                    {!!userProduct.products
                                                        ?.length && (
                                                        <button
                                                            type="submit"
                                                            className={
                                                                isSubmitting ||
                                                                !isValid
                                                                    ? "btn-rev btn-disabled"
                                                                    : "btn-rev"
                                                            }
                                                            disabled={
                                                                isSubmitting ||
                                                                !isValid
                                                            }
                                                        >
                                                            Save
                                                        </button>
                                                    )}
                                                    {userProduct?.products
                                                        ?.length > 0 && (
                                                        <div
                                                            className="cursor-pointer bg-dark-300 hover:shadow-lg px-9 py-3 rounded-full"
                                                            onClick={() => {
                                                                router.push(
                                                                    "../org/disruption"
                                                                );
                                                            }}
                                                        >
                                                            <span className="text-xl text-md text-white">
                                                                Go to next -{" "}
                                                                <span className="text-white">
                                                                    Disruption
                                                                </span>
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </>
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
            <Chat initialMessage={chatGPTMessage}></Chat>
        </>
    );
};

export default RedOceanContent;
