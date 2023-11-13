import { useEffect, useState } from "react";

import * as productsApi from "../../http-client/products.client";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { IUserProduct } from "../../models/user-product";
import { productPagesEnum } from "../../models/enums";
import { IProduct } from "../../models/types";

import FormikContextChild from "../products/formik-context-child";
import BlueOceanProduct from "./product";
import Spinner from "../common/spinner";
import ZeroProductsWarning from "../common/zero-products-warning";
import ZeroProductCompetitorsWarning from "../common/zero-product-competitors-warning";
import GoNextButton from "../common/go-next-button";
import Chat from "../common/openai-chat/openai-chat";
import { stepSevenTranscript } from "../common/openai-chat/openai-transcript";
import { getBlueOceanMessage } from "../common/openai-chat/custom-messages";

import { useFormik, FieldArray, Form, Formik } from "formik";
import { string, object, array } from "yup";
import { cloneDeep } from "lodash";

interface Props {
    userProduct: IUserProduct;
    dispatchProducts: (products: IProduct[]) => void;
    isLoading: boolean;
}

const BlueOceanContent = ({
    userProduct,
    dispatchProducts,
    isLoading,
}: Props) => {
    const queryClient = useQueryClient();

    const [chatGPTMessage, setChatGPTMessage] = useState<string>("");
    // on data load send ChatGPT transcript with data
    useEffect(() => {
        if (!isLoading && userProduct.id) {
            const combinedMsg = `${stepSevenTranscript}\n\n${getBlueOceanMessage(
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
                    setChatGPTMessage(getBlueOceanMessage(newProducts));
                },
                onSuccess: newProducts => {
                    queryClient.invalidateQueries([
                        productsApi.Keys.UserProduct,
                        userProduct.id,
                    ]);
                    queryClient.invalidateQueries([productsApi.Keys.All]);
                },
            }
        );

    // // isn't this better formik usage for readability?
    // const formik = useFormik({
    //     initialValues: { products: userProduct.products },
    //     validationSchema: object({
    //         products: array(
    //             object({
    //                 factors: array(
    //                     object({
    //                         name: string().required("required"),
    //                     })
    //                 )
    //                     .required("Must provide at least one factor !")
    //                     .min(1, "Must provide at least one factor !"),
    //             })
    //         ),
    //     }),
    //     onSubmit: async (values, actions) => {
    //         values.products?.map(product => {
    //             if (!product.uuid) {
    //                 product.uuid = crypto.randomUUID();
    //             }
    //         });
    //         if (userProduct?.id) {
    //             userProduct.products = values.products;
    //             await updateUserProduct({
    //                 ...userProduct,
    //             });
    //         }
    //         actions.setSubmitting(false);
    //     },
    // });

    return (
        <>
            <div className="grow flex flex-col gap-2 px-16 py-8 bg-white relative rounded-3xl">
                <h3 className="title-header">Blue Ocean Canvas</h3>
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
                                ).required("Must provide at least one factor!"),
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
                    {({ values, isSubmitting, isValid }) => {
                        return (
                            <Form>
                                <FieldArray name="products">
                                    {({ push, remove }) => {
                                        return (
                                            <>
                                                <div className="flex flex-col gap-4">
                                                    {isLoading && (
                                                        <Spinner
                                                            className="flex items-center text-2xl"
                                                            message="Loading Blue Ocean..."
                                                        />
                                                    )}
                                                    {!isLoading &&
                                                        userProduct.products
                                                            .length === 0 && (
                                                            <ZeroProductsWarning />
                                                        )}
                                                    {!isLoading &&
                                                        !values.products
                                                            ?.length &&
                                                        !!userProduct.products
                                                            ?.length && (
                                                            <p className="text-rose-400">
                                                                make a selection
                                                                to view products
                                                                !
                                                            </p>
                                                        )}
                                                    {!!values.products
                                                        ?.length &&
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
                                                                        <BlueOceanProduct
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
                                                                            <h3>
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
                                                        <GoNextButton
                                                            stepUri={`../org/non-customers`}
                                                            nextStepTitle={`Non
                                                            Customers`}
                                                            clickable={
                                                                userProduct
                                                                    ?.products
                                                                    ?.length > 0
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    }}
                                </FieldArray>

                                <FormikContextChild
                                    dispatch={values => {
                                        dispatchProducts(
                                            cloneDeep(values.products)
                                        );
                                    }}
                                />
                            </Form>
                        );
                    }}
                </Formik>
            </div>
            <Chat initialMessage={chatGPTMessage}></Chat>
        </>
    );
};

export default BlueOceanContent;
