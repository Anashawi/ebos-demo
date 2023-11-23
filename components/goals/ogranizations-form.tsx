import { useEffect } from "react";
import { useSession } from "next-auth/react";

import * as organizationsApi from "../../http-client/organizations.client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IUserOrganizations } from "../../models/organization";
import { OrganizationModel } from "../../models/types";

import Spinner from "../common/spinner";
import { getUserOrganizationsMsg } from "../common/openai-chat/custom-messages";

import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const emptyOrganization: OrganizationModel = {
    uuid: typeof window !== "undefined" ? crypto.randomUUID() : "",
    name: "New Organization",
    website: "",
};

interface Props {
    fetchedUserOrganizations: IUserOrganizations;
    areUserOrganizationsLoading: boolean;
    userOrganizations: IUserOrganizations;
    setUserOrganizations: React.Dispatch<
        React.SetStateAction<IUserOrganizations>
    >;
    setChatGPTMessage: React.Dispatch<React.SetStateAction<string>>;
}

const OrganizationsForm = ({
    fetchedUserOrganizations,
    areUserOrganizationsLoading,
    userOrganizations,
    setUserOrganizations,
    setChatGPTMessage,
}: Props) => {
    const { data: session }: any = useSession();
    const queryClient = useQueryClient();

    // render user organizations
    useEffect(() => {
        if (fetchedUserOrganizations) {
            setUserOrganizations({ ...fetchedUserOrganizations });
        }
    }, [fetchedUserOrganizations, setUserOrganizations]);

    // insert/update user organizations
    const { mutate, isLoading: isSaving } = useMutation({
        mutationFn: !userOrganizations.id
            ? organizationsApi.insertOne
            : organizationsApi.updateOne,
        mutationKey: [
            organizationsApi.keys.updateUserOrganizations,
            userOrganizations.id ?? "",
        ],
        onMutate: newUserOrgs => {
            setChatGPTMessage(getUserOrganizationsMsg(newUserOrgs));
        },
        onSuccess: storedUserOrgs => {
            queryClient.invalidateQueries([
                organizationsApi.keys.updateUserOrganizations,
                userOrganizations.id ?? "",
            ]);
            // flag locally stored goals as invalid, to be loaded onPageLoad
            queryClient.invalidateQueries([organizationsApi.keys.all]);
            setUserOrganizations(storedUserOrgs);
        },
    });

    const notLoadingWithoutOrgs =
        !areUserOrganizationsLoading &&
        userOrganizations.organizations?.length === 0;
    const notLoadingWithOrgs =
        !areUserOrganizationsLoading &&
        userOrganizations.organizations?.length > 0;

    return (
        <div className="organizations-form flex flex-col gap-8">
            <h2 className="title-header">Organizations</h2>
            <div className="flex flex-col gap-4 bg-dark-50 rounded-2xl p-4">
                <div className="flex flex-col gap-4">
                    {areUserOrganizationsLoading && (
                        <Spinner
                            message="loading organizations..."
                            className="items-center text-2xl"
                        />
                    )}
                    {notLoadingWithoutOrgs && (
                        <p className="text-yellow-600 text-xl">
                            Click to add an organization
                        </p>
                    )}
                    {notLoadingWithOrgs &&
                        userOrganizations.organizations.map((org, index) => (
                            <div
                                key={org.uuid}
                                className="flex flex-row flex-wrap justify-between gap-4"
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
                <div className="flex flex-col justify-center gap-2">
                    <div className="flex justify-end h-10">
                        {isSaving && (
                            <Spinner
                                message="Saving organizations..."
                                className="items-center text-xl"
                            />
                        )}
                    </div>
                    <div className="flex justify-between">
                        {!areUserOrganizationsLoading && (
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
                        )}
                        <button
                            type="button"
                            disabled={isSaving}
                            onClick={() => {
                                mutate(userOrganizations);
                            }}
                            className={`btn-rev ${
                                isSaving ? `opacity-50 cursor-not-allowed` : ``
                            }`}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizationsForm;
