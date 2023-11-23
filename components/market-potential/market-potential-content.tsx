import { useEffect, useState } from "react";

import * as productsApi from "../../http-client/products.client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUserProduct } from "../../models/user-product";
import { productPagesEnum } from "../../models/enums";
import { IProduct } from "../../models/types";

import CompetitorsProduct from "./product";
import Spinner from "../common/spinner";
import GoNextButton from "../common/go-next-button";
import ZeroProductsWarning from "../common/zero-products-warning";
import FormikContextChild from "../products/formik-context-child";
import Chat from "../common/openai-chat/openai-chat";
import { stepThreeTranscript } from "../common/openai-chat/openai-transcript";
import { getMarketPotentialMessage } from "../common/openai-chat/custom-messages";

import { FieldArray, Form, Formik } from "formik";
import { object, array, string, number } from "yup";
import { cloneDeep } from "lodash";

interface Props {
    userProduct: IUserProduct;
    isLoading: boolean;
    setChartProducts: (products: IProduct[]) => void;
}

const MarketPotentialContent = ({
    userProduct,
    isLoading: areUserProductsLoading,
    setChartProducts,
}: Props) => {
    const queryClient = useQueryClient();

    const [chatGPTMessage, setChatGPTMessage] = useState<string>("");
    // on data load send ChatGPT transcript with data
    useEffect(() => {
        if (!areUserProductsLoading && userProduct.id) {
            setChatGPTMessage(
                `${stepThreeTranscript}\n\n${getMarketPotentialMessage(
                    userProduct
                )}`
            );
        }
    }, [areUserProductsLoading, userProduct]);

    const { mutate: updateUserProduct, isLoading: isUpdatingUserProduct } =
        useMutation(
            (userProduct: IUserProduct) => {
                return productsApi.updateOne(
                    userProduct,
                    productPagesEnum.competitors
                );
            },
            {
                onMutate: newProducts => {
                    queryClient.setQueryData(
                        [productsApi.Keys.UserProduct, userProduct.id],
                        newProducts
                    );
                    setChatGPTMessage(getMarketPotentialMessage(newProducts));
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

    const isNotLoadingWithoutProducts =
        !areUserProductsLoading && userProduct.products.length === 0;
    const isNotLoadingWithProducts =
        !areUserProductsLoading && userProduct.products.length > 0;

    return (
        <>
            <div className="relative grow px-16 py-8 flex flex-col gap-4 bg-white rounded-3xl">
                <h2 className="title-header">Market potential</h2>
                <Formik
                    initialValues={{
                        products: userProduct.products,
                    }}
                    validationSchema={object({
                        products: array(
                            object({
                                competitors: array(
                                    object({
                                        name: string().required("required"),
                                        marketShare: number()
                                            .required("required")
                                            .min(
                                                0,
                                                "Market share must be 0 or greater"
                                            ),
                                    })
                                )
                                    .required(
                                        "Must provide at least one competitor !"
                                    )
                                    .min(
                                        1,
                                        "Must provide at least one competitor !"
                                    ),
                            })
                        ).required(),
                    })}
                    onSubmit={async (values, actions) => {
                        values.products?.map(product => {
                            if (!product.uuid) {
                                product.uuid = crypto.randomUUID();
                            }
                        });

                        if (userProduct?.id) {
                            values.products = [...values.products];
                            userProduct.products = [...values.products];
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
                                    {() => {
                                        return (
                                            <div className="flex flex-col gap-2">
                                                {areUserProductsLoading && (
                                                    <Spinner
                                                        className="text-2xl items-center"
                                                        message="Loading Market Potential..."
                                                    ></Spinner>
                                                )}
                                                {isNotLoadingWithoutProducts && (
                                                    <ZeroProductsWarning />
                                                )}
                                                {isNotLoadingWithProducts &&
                                                    values.products.length ===
                                                        0 && (
                                                        <p className="w-max italic py-5">
                                                            Select a product to
                                                            start analyzing its
                                                            market potential ...
                                                        </p>
                                                    )}
                                                {isNotLoadingWithProducts &&
                                                    values.products.length >
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
                                                                <CompetitorsProduct
                                                                    product={
                                                                        product
                                                                    }
                                                                    index={
                                                                        productIndex
                                                                    }
                                                                    formUtilities={{
                                                                        isSubmitting,
                                                                        isValid,
                                                                        errors,
                                                                    }}
                                                                />
                                                            </div>
                                                        )
                                                    )}
                                                <div className="flex justify-end h-10">
                                                    {isUpdatingUserProduct && (
                                                        <Spinner
                                                            className="flex items-center text-xl"
                                                            message="Saving Market Potential..."
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex flex-row gap-4 justify-end">
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
                                                    <GoNextButton
                                                        stepUri={`../org/red-ocean`}
                                                        nextStepTitle={`Red Ocean Canvas`}
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
                                        setChartProducts(
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

export default MarketPotentialContent;
