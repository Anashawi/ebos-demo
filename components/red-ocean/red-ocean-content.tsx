import { Dispatch, SetStateAction, useContext } from "react";

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
import { getRedOceanMessage } from "../common/openai-chat/custom-messages";

import { FieldArray, Form, Formik } from "formik";
import { string, object, array } from "yup";
import { cloneDeep } from "lodash";
import { appContextData } from "../../context";

interface Props {
  userProducts: IUserProduct;
  dispatchChartProducts: (products: IProduct[]) => void;
  isLoading: boolean;
}

const RedOceanContent = ({ userProducts, dispatchChartProducts, isLoading }: Props) => {
  const queryClient = useQueryClient();
  const { appContext, setAppContext } = useContext(appContextData);

  const { mutate: updateUserProduct, isLoading: isUpdatingUserProduct } = useMutation(
    (newUserProducts: IUserProduct) => {
      return productsApi.updateOne(newUserProducts, productPagesEnum.factors);
    },
    {
      onMutate: (newProducts) => {
        queryClient.setQueryData([productsApi.Keys.UserProduct, userProducts.id], newProducts);
        setAppContext({
          ...appContext,
          openAIMessage: getRedOceanMessage(newProducts),
        });
      },
      onSuccess: (storedProducts) => {
        queryClient.invalidateQueries([productsApi.Keys.UserProduct, userProducts.id]);
        queryClient.invalidateQueries([productsApi.Keys.All]);
      },
    }
  );

  return (
    <section className="form-container">
      <h3 className="title-header">Red Ocean Canvas</h3>
      <Formik
        initialValues={{
          products: userProducts.products,
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
          values.products?.map((product) => {
            if (!product.uuid) {
              product.uuid = crypto.randomUUID();
            }
          });
          if (userProducts?.id) {
            userProducts.products = values.products;
            await updateUserProduct({
              ...userProducts,
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
                {({ push, remove }) => {
                  return (
                    <div className="flex flex-col gap-2">
                      {!isLoading ? (
                        values.products.length > 0 ? (
                          values.products.map((product, productIndex) =>
                            product.competitors && product.competitors.length > 2 ? (
                              <RedOceanProduct key={`prod-${productIndex}`} product={product} index={productIndex} />
                            ) : (
                              <ZeroProductCompetitorsWarning key={`prod-${productIndex}`} name={product.name} />
                            )
                          )
                        ) : (
                          <ZeroProductsWarning />
                        )
                      ) : (
                        <Spinner className="flex items-center text-2xl" message="Loading Red Ocean..." />
                      )}
                      <div className="flex justify-end h-10">
                        {isUpdatingUserProduct && (
                          <Spinner className="flex items-center text-xl" message="Saving Red Ocean" />
                        )}
                      </div>
                      <div className="flex gap-4 justify-end">
                        <button
                          type="submit"
                          className={
                            isLoading ||
                            isUpdatingUserProduct ||
                            isSubmitting ||
                            !isValid ||
                            userProducts.products.length === 0
                              ? "btn-rev btn-disabled"
                              : "btn-rev"
                          }
                          disabled={
                            isUpdatingUserProduct || isSubmitting || !isValid || userProducts.products.length === 0
                          }>
                          Save
                        </button>
                        <GoNextButton
                          stepUri={`../org/disruption`}
                          nextStepTitle={`Disruption`}
                          disabled={isSubmitting || !isValid || userProducts.products.length === 0}
                        />
                      </div>
                    </div>
                  );
                }}
              </FieldArray>

              <FormikContextChild
                dispatch={(values) => {
                  dispatchChartProducts(cloneDeep(values.products));
                }}
              />
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

export default RedOceanContent;
