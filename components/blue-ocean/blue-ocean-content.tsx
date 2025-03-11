import { Dispatch, SetStateAction } from "react";

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
import { getBlueOceanMessage } from "../common/openai-chat/custom-messages";

import { useFormik, FieldArray, Form, Formik } from "formik";
import { string, object, array } from "yup";
import { cloneDeep } from "lodash";

interface Props {
  userProduct: IUserProduct;
  dispatchProducts: (products: IProduct[]) => void;
  isLoading: boolean;
  setOpenaiMessage: Dispatch<SetStateAction<string>>;
}

const BlueOceanContent = ({ userProduct, dispatchProducts, isLoading, setOpenaiMessage }: Props) => {
  const queryClient = useQueryClient();

  const { mutate: updateUserProduct, isLoading: isUpdatingUserProduct } = useMutation(
    (userProduct: IUserProduct) => {
      return productsApi.updateOne(userProduct, productPagesEnum.factors);
    },
    {
      onMutate: (newProducts) => {
        queryClient.setQueryData([productsApi.Keys.UserProduct, userProduct.id], newProducts);
        setOpenaiMessage(getBlueOceanMessage(newProducts));
      },
      onSuccess: (newProducts) => {
        queryClient.invalidateQueries([productsApi.Keys.UserProduct, userProduct.id]);
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
    <section className="form-container">
      <h3 className="title-header">Blue Ocean Canvas</h3>
      <Formik
        initialValues={{
          products: userProduct.products,
        }}
        validationSchema={object({
          products: array(
            object({
              ideaFactors: array(
                object({
                  name: string().required("required"),
                })
              )
                .required("at least 1 idea is required")
                .min(1),
            })
          ),
        })}
        onSubmit={async (values, actions) => {
          values.products?.map((product) => {
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
        validateOnMount>
        {({ values, isSubmitting, isValid }) => {
          return (
            <Form>
              <FieldArray name="products">
                {() => {
                  return (
                    <div className="flex flex-col gap-2">
                      {!isLoading ? (
                        userProduct.products.length > 0 ? (
                          values.products.map((product, productIndex) =>
                            product.competitors && product.competitors.length > 2 ? (
                              <BlueOceanProduct key={productIndex} product={product} index={productIndex} />
                            ) : (
                              <ZeroProductCompetitorsWarning key={productIndex} name={product.name} />
                            )
                          )
                        ) : (
                          <ZeroProductsWarning />
                        )
                      ) : (
                        <Spinner className="flex items-center text-2xl" message="Loading Blue Ocean..." />
                      )}
                      <div className="flex justify-end h-10">
                        {isUpdatingUserProduct && (
                          <Spinner className="flex items-center text-xl" message="Saving Red Ocean" />
                        )}
                      </div>
                      <div className="flex gap-4 justify-end items-center">
                        <button
                          type="submit"
                          className={isSubmitting || !isValid ? "btn-rev btn-disabled" : "btn-rev"}
                          disabled={isSubmitting || !isValid}>
                          Save
                        </button>
                        <GoNextButton
                          stepUri={`../org/non-customers`}
                          nextStepTitle={`Non
                                                            Customers`}
                          disabled={isSubmitting || !isValid}
                        />
                      </div>
                    </div>
                  );
                }}
              </FieldArray>

              <FormikContextChild
                dispatch={(values) => {
                  dispatchProducts(cloneDeep(values.products));
                }}
              />
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

export default BlueOceanContent;
