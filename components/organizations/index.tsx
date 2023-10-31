import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as client from "../../http-client/organizations.client";

import { IUserOrganizations } from "../../models/organization";
import { OrganizationModel } from "../../models/types";

import Spinner from "../common/spinner";
import { getUserOrganizationsMsg } from "../common/openai-chat/custom-messages";

import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
    userOrganizations: IUserOrganizations;
    setUserOrganizations: React.Dispatch<
        React.SetStateAction<IUserOrganizations>
    >;
    setChatGPTMessage: React.Dispatch<React.SetStateAction<string>>;
};

// Bug: only 2nd org can be deleted!
const Organizations = ({
    userOrganizations,
    setUserOrganizations,
    setChatGPTMessage,
}: Props) => {
    const { data: session }: any = useSession();

    const initEmptyOrganization = (uuid: string): OrganizationModel => {
        return {
            uuid,
            name: "New Organization",
            website: "",
        };
    };

    const emptyOrganization = initEmptyOrganization(
        typeof window !== "undefined" ? crypto.randomUUID() : ""
    );

    // fetch user organizations
    const {
        data: fetchedUserOrganizations,
        isLoading: isUserOrganizationsLoading,
    } = useQuery([client.keys.all, session?.user?.id], client.getAll, {
        refetchOnWindowFocus: false,
        retry: 2,
    });

    // render user organizations
    useEffect(() => {
        if (fetchedUserOrganizations) {
            setUserOrganizations({ ...fetchedUserOrganizations });
        }
    }, [fetchedUserOrganizations]);

    // insert/update user organization
    const { mutate, isLoading: isSaving } = useMutation({
        mutationFn: !userOrganizations.id ? client.insertOne : client.updateOne,
        mutationKey: [
            client.keys.updateUserOrganizations,
            userOrganizations.id ?? "",
        ],
        onMutate: updatedUserOrgs => {
            setChatGPTMessage(getUserOrganizationsMsg(updatedUserOrgs));
        },
        onSuccess: updatedUserOrgs => {
            setUserOrganizations(updatedUserOrgs);
        },
    });

    return (
        <>
            <h1 className="title-header">Organizations</h1>
            <div className="text-lg bg-dark-50 rounded-2xl p-5">
                <div className="flex flex-col gap-5">
                    {isUserOrganizationsLoading && (
                        <Spinner
                            message="loading organizations..."
                            className="items-center text-2xl"
                        />
                    )}
                    {!isUserOrganizationsLoading &&
                        !userOrganizations.organizations?.length && (
                            <p className="text-yellow-600 text-xl">
                                Click to add an organization
                            </p>
                        )}
                    {!isUserOrganizationsLoading &&
                        userOrganizations.organizations?.length &&
                        userOrganizations.organizations.map((org, index) => (
                            <div
                                key={org.uuid}
                                className="flex gap-5 justify-between"
                            >
                                <div className="grow flex flex-col gap-1">
                                    <label>
                                        {index === 0
                                            ? "Name"
                                            : `Competitor ${index}`}
                                    </label>
                                    <input
                                        type="text"
                                        onChange={e => {
                                            org.name = e.target.value;
                                            setUserOrganizations(
                                                userOrganizations
                                            );
                                        }}
                                        defaultValue={org.name}
                                        className="light-input"
                                    />
                                </div>
                                <div className="grow flex flex-col gap-1">
                                    <label>Website</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            onChange={e => {
                                                org.website = e.target.value;
                                                setUserOrganizations(
                                                    userOrganizations
                                                );
                                            }}
                                            defaultValue={org.website}
                                            className="light-input w-full"
                                        />
                                        {index !== 0 && (
                                            <FontAwesomeIcon
                                                icon={faTimes}
                                                onClick={() => {
                                                    userOrganizations.organizations =
                                                        userOrganizations.organizations.filter(
                                                            organization =>
                                                                organization.uuid !==
                                                                org.uuid
                                                        );
                                                    setUserOrganizations({
                                                        ...userOrganizations,
                                                    });
                                                }}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer w-4 text-dark-300 hover:text-dark-400"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                {!isUserOrganizationsLoading && (
                    <div className="pt-7">
                        <button
                            type="button"
                            onClick={() => {
                                setUserOrganizations(prevValue => {
                                    return {
                                        ...prevValue,
                                        organizations: [
                                            ...prevValue.organizations,
                                            emptyOrganization,
                                        ],
                                    };
                                });
                            }}
                            className="btn-primary pl-9 pr-8"
                        >
                            <FontAwesomeIcon
                                className="w-[0.8rem] h-auto cursor-pointer"
                                icon={faPlus}
                            />
                            <span className="text-xl">
                                Add New Organization
                            </span>
                        </button>
                    </div>
                )}
            </div>
            <div className="h-10">
                {isSaving && (
                    <Spinner
                        message="Saving organizations..."
                        className="items-center text-xl"
                    />
                )}
            </div>
            <div className="flex gap-3 mb-5">
                <button
                    type="button"
                    disabled={isSaving}
                    onClick={() => {
                        mutate(userOrganizations);
                    }}
                    className={
                        !isSaving
                            ? "btn-rev"
                            : "btn-rev opacity-50 cursor-not-allowed"
                    }
                >
                    Save
                </button>
            </div>
        </>
    );
};

export default Organizations;
