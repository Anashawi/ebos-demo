import { Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";

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
import { getCompanyProductMessage } from "../common/openai-chat/custom-messages";

import { FieldArray, Form, Formik } from "formik";
import { object, array, string, number } from "yup";
import { cloneDeep } from "lodash";

interface Props {
  userProduct: IUserProduct;
  isLoading: boolean;
  setChartProducts: (products: IProduct[]) => void;
  setOpenaiMessage: Dispatch<SetStateAction<string>>;
}

const MarketPotentialContent = ({
  userProduct,
  isLoading: areUserProductsLoading,
  setChartProducts,
  setOpenaiMessage,
}: Props) => {
  const { data: session }: any = useSession();
  const queryClient = useQueryClient();

  const { mutate: updateUserProduct, isLoading: isUpdatingUserProduct } = useMutation(
    (userProduct: IUserProduct) => {
      return productsApi.updateOne(userProduct, productPagesEnum.competitors);
    },
    {
      onMutate: (newProducts) => {
        setOpenaiMessage(getCompanyProductMessage(newProducts));
      },
      onSuccess: (storedProducts) => {
        queryClient.invalidateQueries([productsApi.Keys.All, session?.user?.id]);
      },
    }
  );

  const isNotLoadingWithoutProducts = !areUserProductsLoading && userProduct.products.length === 0;
  const isNotLoadingWithProducts = !areUserProductsLoading && userProduct.products.length > 0;

  return (
    <section className="form-container">
      <h3 className="title-header">Market potential</h3>
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
                  marketShare: number().required("required").min(0, "Market share must be 0 or greater"),
                })
              )
                .required("Must provide at least one competitor !")
                .min(1, "Must provide at least one competitor !"),
            })
          ).required(),
        })}
        onSubmit={async (values, actions) => {
          values.products?.map((product) => {
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
        validateOnMount>
        {({ values, isSubmitting, isValid, errors }) => {
          return (
            <Form>
              <FieldArray name="products">
                {() => {
                  return (
                    <div className="flex flex-col gap-2">
                      {areUserProductsLoading && (
                        <Spinner className="text-2xl items-center" message="Loading Market Potential..."></Spinner>
                      )}
                      {isNotLoadingWithoutProducts && <ZeroProductsWarning />}
                      {isNotLoadingWithProducts && values.products.length === 0 && (
                        <p className="w-max italic py-5">
                          Select a product to start analyzing its market potential ...
                        </p>
                      )}
                      {isNotLoadingWithProducts &&
                        values.products.length > 0 &&
                        values.products.map((product, productIndex) => (
                          <div key={productIndex}>
                            <CompetitorsProduct
                              product={product}
                              index={productIndex}
                              formUtilities={{
                                isSubmitting,
                                isValid,
                                errors,
                              }}
                            />
                          </div>
                        ))}
                      <div className="flex justify-end h-10">
                        {isUpdatingUserProduct && (
                          <Spinner className="flex items-center text-xl" message="Saving Market Potential..." />
                        )}
                      </div>
                      <div className="flex flex-row gap-4 justify-end">
                        <button
                          type="submit"
                          className={`btn-rev ${
                            isUpdatingUserProduct ||
                            areUserProductsLoading ||
                            isSubmitting ||
                            !isValid ||
                            userProduct.products.length < 1
                              ? `btn-disabled`
                              : ``
                          }`}
                          disabled={
                            isUpdatingUserProduct ||
                            areUserProductsLoading ||
                            isSubmitting ||
                            !isValid ||
                            userProduct.products.length < 1
                          }>
                          Save
                        </button>
                        <GoNextButton
                          stepUri={`../org/red-ocean`}
                          nextStepTitle={`Red Ocean Canvas`}
                          disabled={
                            areUserProductsLoading || userProduct.products.length === 0 || isUpdatingUserProduct
                          }
                        />
                      </div>
                    </div>
                  );
                }}
              </FieldArray>

              <FormikContextChild
                dispatch={(values) => {
                  setChartProducts(cloneDeep(values.products));
                }}
              />
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

export default MarketPotentialContent;
