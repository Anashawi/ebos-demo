import { Fragment, useMemo } from "react";

import {
    ICompetitor,
    IFactorCompetitor,
    IIdeaFactor,
    IProduct,
} from "../../models/types";

import DeleteButton from "../common/delete-button";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldArray, Field, ErrorMessage } from "formik";

interface Props {
    product: IProduct;
    index: number;
}

const BlueOceanProduct = ({ product, index }: Props) => {
    const emptyFactor = useMemo(() => {
        return {
            name: "",
            competitors: product.competitors?.map(comp => {
                return {
                    uuid: comp.uuid,
                    value: 1,
                } as IFactorCompetitor;
            }),
        } as IIdeaFactor;
    }, [product.competitors]);

    return (
        <div
            key={index}
            className="flex flex-col gap-8 p-4 bg-dark-50 rounded-2xl"
        >
            <div className="flex justify-between">
                <h3 className="text-[1.75rem] text-dark-400 font-hero-semibold">
                    {product.name}
                </h3>
            </div>
            <FieldArray name={`products.${index}.ideaFactors`}>
                {({ remove, push }) => (
                    <>
                        <ul className="flex flex-col gap-4">
                            {!!product.ideaFactors?.length &&
                                product.ideaFactors.map((idea, ideaIndex) => (
                                    <li
                                        key={ideaIndex}
                                        className="flex gap-4 items-start overflow-x-auto"
                                    >
                                        <div className="flex flex-col">
                                            <label className="text-lg">
                                                Idea {ideaIndex + 1}
                                            </label>
                                            <Field
                                                type="text"
                                                placeholder="name"
                                                className="grow light-input"
                                                name={`products.${index}.ideaFactors.${ideaIndex}.name`}
                                            />
                                            <ErrorMessage
                                                name={`products.${index}.ideaFactors.${ideaIndex}.name`}
                                            >
                                                {msg => (
                                                    <div className="text-sm text-rose-500">
                                                        {msg}
                                                    </div>
                                                )}
                                            </ErrorMessage>
                                        </div>
                                        <div className="flex gap-2">
                                            {product.competitors?.map(
                                                (
                                                    comp: ICompetitor,
                                                    compIndex: number
                                                ) => (
                                                    <Fragment key={comp.uuid}>
                                                        {!comp.isUntapped && (
                                                            <div className="flex flex-col">
                                                                <label className="text-lg">
                                                                    {comp.name}
                                                                </label>
                                                                <Field
                                                                    as="select"
                                                                    placeholder={`products.${index}.ideaFactors.${ideaIndex}.competitors.${index}.value`}
                                                                    className="light-input"
                                                                    name={`products.${index}.ideaFactors.${ideaIndex}.competitors.${compIndex}.value`}
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
                                                                    name={`products.${index}.ideaFactors.${ideaIndex}.competitors.${index}.value`}
                                                                >
                                                                    {msg => (
                                                                        <div className="w-full text-sm text-rose-500">
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
                                        </div>
                                        <DeleteButton
                                            callback={() => {
                                                remove(ideaIndex);
                                            }}
                                        />
                                    </li>
                                ))}
                            <div className="flex">
                                <button
                                    type="button"
                                    onClick={() => {
                                        push(emptyFactor);
                                    }}
                                    className="btn-primary px-10"
                                >
                                    <FontAwesomeIcon
                                        className="w-3 h-auto cursor-pointer hover:text-gray-600"
                                        icon={faPlus}
                                    />
                                    Add More Idea Factors
                                </button>
                            </div>
                        </ul>
                    </>
                )}
            </FieldArray>
        </div>
    );
};

export default BlueOceanProduct;
