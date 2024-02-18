import { Fragment, useMemo } from 'react';
import { NextPage } from 'next';

import {
    ICompetitor,
    IFactorCompetitor,
    IFactor,
    IProduct,
} from '../../models/types';

import DeleteButton from '../common/delete-button';

import { FieldArray, Field, ErrorMessage } from 'formik';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    product: IProduct;
    index: number;
}

const RedOceanProduct: NextPage<Props> = ({ product, index }) => {
    const emptyFactor = useMemo(() => {
        return {
            name: '',
            competitors: product.competitors?.map((comp) => {
                return {
                    uuid: comp.uuid,
                    value: 1,
                } as IFactorCompetitor;
            }),
        } as IFactor;
    }, [product.competitors]);

    function trimText(
        text: string,
        maxLength: number,
        suffix: string = '...'
    ): string {
        if (text.length <= maxLength) {
            return text;
        }

        return text.substring(0, maxLength) + suffix;
    }

    return (
        <section className="flex flex-col gap-8 p-5 bg-dark-50 rounded-2xl">
            <h4 className="text-[1.75rem] text-dark-400 font-hero-bold">
                {product.name}
            </h4>
            <FieldArray name={`products.${index}.factors`}>
                {({ remove: removeFactor, push: pushToFactorsList }) => (
                    <div className="flex flex-col gap-4">
                        <ul className="flex flex-col gap-2 overflow-auto pb-10">
                            {product.factors && product.factors.length > 0
                                ? product.factors.map((factor, factorIndex) => (
                                      <li
                                          key={`fact-${factorIndex}`}
                                          className="flex gap-5 justify-start items-start"
                                      >
                                          <div className="flex flex-col">
                                              <label>
                                                  Factor {factorIndex + 1}
                                              </label>
                                              <Field
                                                  className="light-input"
                                                  name={`products.${index}.factors.${factorIndex}.name`}
                                                  type="text"
                                                  placeholder="Enter factor here"
                                              />
                                              <ErrorMessage
                                                  name={`products.${index}.factors.${factorIndex}.name`}
                                              >
                                                  {(msg) => (
                                                      <p className="text-lg text-rose-500">
                                                          {msg}
                                                      </p>
                                                  )}
                                              </ErrorMessage>
                                          </div>
                                          {product.competitors?.map(
                                              (comp, compIndex) => (
                                                  <Fragment key={comp.uuid}>
                                                      {!comp.isUntapped && (
                                                          <div className="flex flex-col">
                                                              <label className="w-full">
                                                                  {trimText(
                                                                      comp.name,
                                                                      18
                                                                  )}
                                                              </label>
                                                              <Field
                                                                  className="light-input w-[160px]"
                                                                  name={`products.${index}.factors.${factorIndex}.competitors.${compIndex}.value`}
                                                                  as="select"
                                                                  placeholder={`products.${index}.factors.${factorIndex}.competitors.${compIndex}.value`}
                                                              >
                                                                  <option
                                                                      className="text-lg"
                                                                      value={1}
                                                                  >
                                                                      Poor
                                                                  </option>
                                                                  <option
                                                                      className="text-lg"
                                                                      value={2}
                                                                  >
                                                                      Moderate
                                                                  </option>
                                                                  <option
                                                                      className="text-lg"
                                                                      value={3}
                                                                  >
                                                                      Good
                                                                  </option>
                                                                  <option
                                                                      className="text-lg"
                                                                      value={4}
                                                                  >
                                                                      Excellent
                                                                  </option>
                                                              </Field>
                                                              <ErrorMessage
                                                                  name={`products.${index}.factors.${factorIndex}.competitors.${index}.value`}
                                                              >
                                                                  {(msg) => (
                                                                      <p className="text-lg text-rose-500">
                                                                          {msg}
                                                                      </p>
                                                                  )}
                                                              </ErrorMessage>
                                                          </div>
                                                      )}
                                                  </Fragment>
                                              )
                                          )}
                                          <DeleteButton
                                              callback={() => {
                                                  removeFactor(factorIndex);
                                              }}
                                          />
                                      </li>
                                  ))
                                : `Add Factors to start`}
                        </ul>
                        <button
                            className="btn-primary w-80 px-10"
                            type="button"
                            onClick={() => {
                                pushToFactorsList(emptyFactor);
                            }}
                        >
                            <FontAwesomeIcon
                                className="w-4"
                                icon={faPlus}
                            />
                            Add More Factors
                        </button>
                    </div>
                )}
            </FieldArray>
        </section>
    );
};

export default RedOceanProduct;
