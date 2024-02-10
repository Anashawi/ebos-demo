import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldArray, Field, ErrorMessage } from "formik";
import { ICompetitor, IProduct } from "../../models/types";

interface Props {
    product: IProduct;
    index: number;
    formUtilities: any;
}

const CompetitorsProduct = ({ product, index, formUtilities }: Props) => {
    const emptyCompetitor = {
        uuid: crypto.randomUUID(),
        name: "",
        marketShare: 0,
        isUntapped: false,
    } as ICompetitor;

    return (
        <div className="flex flex-row justify-center text-lg bg-dark-50 rounded-2xl">
            <div key={index} className="w-full">
                <FieldArray name={`products.${index}.competitors`}>
                    {({ remove, push }) => (
                        <div className="relative">
                            <ul className="flex flex-col gap-4 p-5">
                                {!product?.competitors?.length && (
                                    <div className="text-center bg-rose-50 text-sm text-rose-500 p-5">
                                        Please, add at least one competitor
                                    </div>
                                )}
                                {!!product?.competitors?.length &&
                                    product?.competitors.map(
                                        (comp, compIndex) => (
                                            <li
                                                key={compIndex}
                                                className="flex flex-row flex-wrap justify-center gap-4 items-start relative"
                                            >
                                                {(
                                                    <div className="grow flex flex-col gap-2">
                                                        <label>
                                                            {
                                                                compIndex === 0 && (
                                                                    <label>
                                                                        My Product
                                                                    </label>
                                                                )
                                                            }
                                                            {compIndex === 1 && (
                                                                <label>
                                                                    {comp.isUntapped ? "Untapped Market" : `Competitor ${compIndex}`}
                                                                </label>
                                                            )}
                                                            {compIndex > 1 && (
                                                                <label>
                                                                    {!comp.isUntapped && `Competitor ${compIndex - 1}`}

                                                                </label>
                                                            )}
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            placeholder={compIndex === 1 ? "Untapped Market" : "name"}
                                                            className="w-full light-input"
                                                            name={`products.${index}.competitors.${compIndex}.name`}
                                                        />
                                                        <ErrorMessage
                                                            name={`products.${index}.competitors.${compIndex}.name`}
                                                        >
                                                            {msg => (
                                                                <div className="text-sm text-rose-500">
                                                                    {msg}
                                                                </div>
                                                            )}
                                                        </ErrorMessage>
                                                    </div>
                                                )}

                                                <div className="grow relative flex flex-col gap-2">
                                                    <label>
                                                        Market share (USD)
                                                    </label>
                                                    <Field
                                                        type="number"
                                                        placeholder="percentage"
                                                        className="light-input"
                                                        name={`products.${index}.competitors.${compIndex}.marketShare`}
                                                        min="0"
                                                    />
                                                    <ErrorMessage
                                                        name={`products.${index}.competitors.${compIndex}.marketShare`}
                                                    >
                                                        {msg => (
                                                            <div className="w-full text-sm text-rose-500">
                                                                {msg}
                                                            </div>
                                                        )}
                                                    </ErrorMessage>
                                                    {compIndex > 1 && (
                                                        <FontAwesomeIcon
                                                            icon={faTimes}
                                                            onClick={() => {
                                                                if (
                                                                    compIndex >
                                                                    0
                                                                )
                                                                    remove(
                                                                        compIndex
                                                                    );
                                                            }}
                                                            className="w-4 h-auto absolute top-[55%] right-5 cursor-pointer text-dark-300 hover:text-dark-400"
                                                        />
                                                    )}
                                                </div>
                                            </li>
                                        )
                                    )}
                                <div>
                                    {!!formUtilities.errors?.competitors &&
                                        formUtilities.errors.competitors
                                            .product_uuid === product?.uuid && (
                                            <p className="text-rose-500">
                                                {
                                                    formUtilities.errors
                                                        .competitors
                                                        .errorMessage
                                                }
                                            </p>
                                        )}
                                </div>
                                <div className="flex">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newCompetitor = emptyCompetitor
                                            console.log(product?.competitors?.length)
                                            if (!product?.competitors?.length || product.competitors.length === 0) {
                                                newCompetitor.name = product.name;
                                            }
                                            else if (product.competitors.length === 1) {
                                                newCompetitor.name = "Untapped Market";
                                                newCompetitor.isUntapped = true;
                                            }
                                            push(newCompetitor);
                                        }}
                                        className="btn-primary px-10"
                                    >
                                        <FontAwesomeIcon
                                            className="w-3 h-auto cursor-pointer hover:text-gray-600"
                                            icon={faPlus}
                                        />
                                        Add New competitors
                                    </button>
                                </div>
                            </ul>
                        </div>
                    )}
                </FieldArray>
            </div>
        </div>
    );
};

export default CompetitorsProduct;
