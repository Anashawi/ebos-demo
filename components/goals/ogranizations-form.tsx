import { useEffect } from "react";

import * as organizationsApi from "../../http-client/organizations.client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUserOrganizations } from "../../models/organization";
import { OrganizationModel } from "../../models/types";

import Spinner from "../common/spinner";
import { getUserOrganizationsMsg } from "../common/openai-chat/custom-messages";

import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const emptyUserOrganization: OrganizationModel = {
    uuid: typeof window !== "undefined" ? crypto.randomUUID() : "",
    name: "",
    website: "",
};

interface Props {
    fetchedUserOrganizations: any;
    areUserOrganizationsLoading: boolean;
    userOrganizations: IUserOrganizations;
    setUserOrganizations: React.Dispatch<React.SetStateAction<IUserOrganizations>>;
    setChatGPTMessage: React.Dispatch<React.SetStateAction<string>>;
}

const OrganizationsForm = ({
    fetchedUserOrganizations,
    areUserOrganizationsLoading,
    userOrganizations,
    setUserOrganizations,
    setChatGPTMessage,
}: Props) => {
    const queryClient = useQueryClient();

    // render user organizations
    useEffect(() => {
        if (fetchedUserOrganizations?.status === 200 && fetchedUserOrganizations.data) {
            setUserOrganizations({ ...fetchedUserOrganizations.data });
        }
    }, [fetchedUserOrganizations, setUserOrganizations]);

    // insert/update user organizations
    const { mutate: createOrUpdateUserOrganizations, isLoading: isSaving } = useMutation({
        mutationFn: !userOrganizations.id ? organizationsApi.insertOne : organizationsApi.updateOne,
        mutationKey: [organizationsApi.keys.updateUserOrganizations, userOrganizations.id ?? ""],
        onMutate: newUserOrgs => {
            setChatGPTMessage(getUserOrganizationsMsg(newUserOrgs));
        },
        onSuccess: storedUserOrgs => {
            queryClient.invalidateQueries([organizationsApi.keys.updateUserOrganizations, userOrganizations.id ?? ""]);
            queryClient.invalidateQueries([organizationsApi.keys.all]);
            setUserOrganizations(storedUserOrgs);
        },
    });

    return (
        <section className="form-container">
            <h3 className="title-header">Organizations</h3>
            <div className="flex flex-col gap-4 bg-dark-50 rounded-2xl p-4">
                <div className="flex flex-col gap-4">
                    {!areUserOrganizationsLoading ? (
                        userOrganizations.organizations.length !== 0 ? (
                            userOrganizations.organizations.map((org, index) => (
                                <div key={`org-${index}`} className="flex flex-row flex-wrap justify-between gap-4">
                                    <div className="grow flex flex-col gap-1">
                                        <label>{index === 0 ? `Name` : `Competitor ${index}`}</label>
                                        <input
                                            className="light-input"
                                            type="text"
                                            defaultValue={org.name}
                                            placeholder="Enter organization name"
                                            onChange={e => {
                                                org.name = e.target.value;
                                                setUserOrganizations(userOrganizations);
                                            }}
                                        />
                                    </div>
                                    <div className="grow flex flex-col gap-1">
                                        <label>Website</label>
                                        <div className="relative">
                                            <input
                                                className="light-input w-full"
                                                type="text"
                                                defaultValue={org.website}
                                                placeholder="Enter organization website"
                                                onChange={e => {
                                                    org.website = e.target.value;
                                                    setUserOrganizations(userOrganizations);
                                                }}
                                            />
                                            {index !== 0 && (
                                                <FontAwesomeIcon
                                                    icon={faTimes}
                                                    onClick={() => {
                                                        userOrganizations.organizations =
                                                            userOrganizations.organizations.filter(
                                                                organization => organization.uuid !== org.uuid
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
                            ))
                        ) : (
                            <p className="text-yellow-600 text-xl">Click add new organization to start</p>
                        )
                    ) : (
                        <Spinner message="loading organizations..." className="items-center text-2xl" />
                    )}
                </div>
                <div className="flex flex-col justify-center gap-2">
                    <div className="flex justify-end h-10">
                        {isSaving && <Spinner className="items-center text-xl" message="Saving organizations..." />}
                    </div>
                    <div className="flex justify-between">
                        <button
                            className="btn-primary px-10"
                            type="button"
                            onClick={() => {
                                setUserOrganizations(prevValue => {
                                    return {
                                        ...prevValue,
                                        organizations: [...prevValue.organizations, emptyUserOrganization],
                                    };
                                });
                            }}
                        >
                            <FontAwesomeIcon className="w-4 cursor-pointer" icon={faPlus} />
                            Add New Organization
                        </button>
                        <button
                            className={`btn-rev ${
                                isSaving || !userOrganizations.organizations.length
                                    ? `opacity-50 cursor-not-allowed`
                                    : ``
                            }`}
                            type="button"
                            disabled={isSaving || !userOrganizations.organizations.length}
                            onClick={() => {
                                createOrUpdateUserOrganizations(userOrganizations);
                            }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrganizationsForm;
