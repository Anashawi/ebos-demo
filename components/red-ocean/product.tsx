import {
    ICompetitor,
    IFactorCompetitor,
    IFactor,
    IProduct,
} from "../../models/types";

import DeleteButton from "../common/delete-button";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldArray, Field, ErrorMessage } from "formik";
import { NextPage } from "next";
import { Fragment, useMemo } from "react";

interface Props {
    product: IProduct;
    index: number;
}

const RedOceanProduct: NextPage<Props> = ({ product, index }) => {
    const emptyFactor = useMemo(() => {
        return {
            name: "",
            competitors: product.competitors?.map(comp => {
                return {
                    uuid: comp.uuid,
                    value: 1,
                } as IFactorCompetitor;
            }),
        } as IFactor;
    }, []);

    return (
        <>
            <div
                key={index}
                className="flex flex-col gap-8 p-5 bg-dark-50 rounded-2xl"
            >
                <h3 className="text-[1.75rem] text-dark-400 font-hero-bold">
                    {product.name}
                </h3>
                <FieldArray name={`products.${index}.factors`}>
                    {({ remove, push }) => (
                        <>
                            <ul className="flex flex-col gap-4 overflow-auto">
                                {!!product.factors?.length &&
                                    product.factors.map(
                                        (factor, factorIndex) => (
                                            <li
                                                key={factorIndex}
                                                className="flex gap-2 items-start"
                                            >
                                                <div className="flex flex-col">
                                                    <label>
                                                        Factor {factorIndex + 1}
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        placeholder="name"
                                                        className="light-input xl:w-[140px]"
                                                        name={`products.${index}.factors.${factorIndex}.name`}
                                                    />
                                                    <ErrorMessage
                                                        name={`products.${index}.factors.${factorIndex}.name`}
                                                    >
                                                        {msg => (
                                                            <div className="text-lg text-rose-500">
                                                                {msg}
                                                            </div>
                                                        )}
                                                    </ErrorMessage>
                                                </div>
                                                {product.competitors?.map(
                                                    (
                                                        comp: ICompetitor,
                                                        compIndex: number
                                                    ) => (
                                                        <Fragment
                                                            key={comp.uuid}
                                                        >
                                                            {!comp.isUntapped && (
                                                                <div className="flex flex-col">
                                                                    <label>
                                                                        {
                                                                            comp.name
                                                                        }
                                                                    </label>
                                                                    <Field
                                                                        as="select"
                                                                        placeholder={`products.${index}.factors.${factorIndex}.competitors.${compIndex}.value`}
                                                                        className="light-input"
                                                                        name={`products.${index}.factors.${factorIndex}.competitors.${compIndex}.value`}
                                                                    >
                                                                        <option
                                                                            className="text-lg"
                                                                            value={
                                                                                1
                                                                            }
                                                                        >
                                                                            Poor
                                                                        </option>
                                                                        <option
                                                                            className="text-lg"
                                                                            value={
                                                                                2
                                                                            }
                                                                        >
                                                                            Moderate
                                                                        </option>
                                                                        <option
                                                                            className="text-lg"
                                                                            value={
                                                                                3
                                                                            }
                                                                        >
                                                                            Good
                                                                        </option>
                                                                        <option
                                                                            className="text-lg"
                                                                            value={
                                                                                4
                                                                            }
                                                                        >
                                                                            Excellent
                                                                        </option>
                                                                    </Field>
                                                                    <ErrorMessage
                                                                        name={`products.${index}.factors.${factorIndex}.competitors.${index}.value`}
                                                                    >
                                                                        {msg => (
                                                                            <div className="w-full text-lg text-rose-500">
                                                                                {
                                                                                    msg
                                                                                }
                                                                            </div>
                                                                        )}
                                                                    </ErrorMessage>
                                                                </div>
                                                            )}
                                                        </Fragment>
                                                    )
                                                )}
                                                <DeleteButton
                                                    callback={() => {
                                                        remove(factorIndex);
                                                    }}
                                                />
                                            </li>
                                        )
                                    )}
                                <div className="flex">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            push(emptyFactor);
                                        }}
                                        className="btn-primary-light pl-9 pr-[4.5rem]"
                                    >
                                        <FontAwesomeIcon
                                            className="w-3 h-auto cursor-pointer hover:text-gray-600"
                                            icon={faPlus}
                                        />
                                        Add More Factors
                                    </button>
                                </div>
                            </ul>
                        </>
                    )}
                </FieldArray>
            </div>
        </>
    );
};

export default RedOceanProduct;
