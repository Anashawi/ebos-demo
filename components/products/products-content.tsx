import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import * as productsApi from "../../http-client/products.client";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { productPagesEnum } from "../../models/enums";
import { IFuture, IProduct } from "../../models/types";
import { IUserProduct } from "../../models/user-product";
import { appContextData } from "../../context";

import Product from "./product";
import Spinner from "../common/spinner";
import GoNextButton from "../common/go-next-button";
import { getCompanyProductMessage } from "../common/openai-chat/custom-messages";

import { FieldArray, Form, Formik } from "formik";
import FormikContextChild from "./formik-context-child";
import { object, array, string, number } from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { cloneDeep } from "lodash";

const emptyProduct = {
  uuid: "",
  name: "",
  futures: [
    {
      year: new Date().getFullYear(),
      level: 1,
      sales: 50,
    } as IFuture,
  ],
};

interface Props {
  userProduct: IUserProduct;
  isLoading: boolean;
  dispatchChartProducts: (products: IProduct[]) => void;
  setOpenaiMessage: Dispatch<SetStateAction<string>>;
}

const ProductsContent = ({ userProduct, isLoading, dispatchChartProducts, setOpenaiMessage }: Props) => {
  const { data: session }: any = useSession();
  const queryClient = useQueryClient();
  const [goToNextEnabled, setGoToNextEnabled] = useState<boolean>(false);

  useEffect(() => {
    setGoToNextEnabled(userProduct.products.length > 0);
  }, [userProduct.products]);

  const { mutate: updateUserProduct, isLoading: isUpdatingUserProduct } = useMutation(
    (newUserProduct: IUserProduct) => {
      return productsApi.updateOne(newUserProduct, productPagesEnum.futures);
    },
    {
      onMutate: (newProduct) => {
        queryClient.setQueryData([productsApi.Keys.UserProduct, userProduct.id], newProduct);
        setOpenaiMessage(getCompanyProductMessage(newProduct));
      },
      onSuccess: (storedProduct) => {
        queryClient.invalidateQueries([productsApi.Keys.UserProduct, userProduct.id]);
        queryClient.invalidateQueries([productsApi.Keys.All]);
        setGoToNextEnabled(true);
      },
    }
  );

  return (
    <>
      <section className="form-container">
        <h3 className="title-header">Pioneer, Migrator, Settler</h3>
        <Formik
          initialValues={{
            products: userProduct?.products,
          }}
          validationSchema={object({
            products: array(
              object({
                name: string().required("required"),
                futures: array(
                  object({
                    year: number()
                      .typeError("specify a year")
                      .min(new Date().getFullYear(), `min year is ${new Date().getFullYear()}`)
                      .required("required"),
                    level: number().required("required"),
                    sales: number().min(0, "must be greater than 0").required("required"),
                  })
                )
                  .required("Must provide at least one future!")
                  .min(1, "Must provide at least one future!"),
              })
            )
              .required("Start adding your products...")
              .min(1, "Start adding your products..."),
          })}
          onSubmit={async (values, actions) => {
            values.products?.map((product) => {
              if (!product.uuid) {
                product.uuid = crypto.randomUUID();
              }
            });
            userProduct.userId = session?.user?.id;
            await updateUserProduct({
              ...userProduct,
              ...values,
            });
            actions.setSubmitting(false);
          }}
          enableReinitialize
          validateOnMount>
          {({ values, isSubmitting, isValid, isValidating }) => {
            return (
              <Form>
                <FieldArray name="products">
                  {({ push, remove, form }) => {
                    return (
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-8">
                          {isLoading && (
                            <Spinner className="flex items-center text-2xl" message="Loading products..." />
                          )}
                          {!!values.products?.length &&
                            values.products?.map((product, productIndex) => (
                              <div key={productIndex}>
                                <Product
                                  product={product}
                                  index={productIndex}
                                  onRemove={() => {
                                    remove(productIndex);
                                  }}
                                />
                              </div>
                            ))}
                          {!values.products?.length && !isLoading && form.errors?.products && (
                            <div className="flex justify-start items-center">
                              <p className="px-8 text-xl text-center italic">
                                <>{form.errors.products}</>
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex">
                          <button
                            className={`btn-primary px-8 ${
                              isUpdatingUserProduct || isLoading || isSubmitting ? `btn-disabled` : ``
                            }`}
                            type="button"
                            onClick={() => {
                              push(emptyProduct);
                            }}
                            disabled={isLoading || isSubmitting}>
                            <FontAwesomeIcon className="w-4 h-auto cursor-pointer" icon={faPlus} />
                            <span>Add New Product</span>
                          </button>
                        </div>
                        <div className="flex justify-end h-10">
                          {isUpdatingUserProduct && (
                            <Spinner className="flex items-center text-lg" message="Saving Products" />
                          )}
                        </div>
                        <div className="flex flex-row justify-end gap-4">
                          <button
                            type="submit"
                            className={`btn-rev ${
                              isUpdatingUserProduct || isSubmitting || (!isValid && !isValidating) ? `btn-disabled` : ``
                            }`}
                            disabled={isUpdatingUserProduct || isSubmitting || (!isValid && !isValidating)}>
                            Save
                          </button>
                          <GoNextButton
                            stepUri={`../org/market-potential`}
                            nextStepTitle={`Market Potential`}
                            disabled={!goToNextEnabled || isUpdatingUserProduct}
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
    </>
  );
};

export default ProductsContent;
