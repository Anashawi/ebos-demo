import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import * as nonCustomersApi from "../../http-client/non-customers.client";
import { useQuery } from "@tanstack/react-query";
import { IUserNonCustomers } from "../../models/user-non-customers";
import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";

import NonCustomersContent from "../../components/non-customers/non-customers-content";
import ChartsContent from "../../components/common/charts-content";

const NonCustomers = () => {
    const { data: session }: any = useSession();

    const emptyUserNonCustomers = {
        id: "",
        userId: session?.user?.id,
        soonNonCustomers: [],
        refusingNonCustomers: [],
        unwantedNonCustomers: [],
    } as IUserNonCustomers;

    const [userNonCustomers, setUserNonCustomers] = useState<IUserNonCustomers>(
        emptyUserNonCustomers
    );

    const { data: fetchedNonCustomers, isLoading: areNonCustomersLoading } =
        useQuery<IUserNonCustomers>({
            queryKey: [nonCustomersApi.Keys.All],
            queryFn: nonCustomersApi.getOne,
            refetchOnWindowFocus: false,
            enabled: !!session?.user?.id,
        });

    useEffect(() => {
        if (fetchedNonCustomers) {
            setUserNonCustomers(fetchedNonCustomers);
        }
    }, [fetchedNonCustomers]);

    return (
        <article className="main-content">
            <article className="forms-container">
                <NonCustomersContent
                    userNonCustomers={userNonCustomers}
                    dispatchUserNonCustomers={setUserNonCustomers}
                    isLoading={areNonCustomersLoading}
                />
            </article>
            <aside className="aside-content">
                <ChartsContent
                    videoPropName={videoPropNamesEnum.nonCustomers}
                    videoLabel="Non Customers Video"
                    chartProducts={[userNonCustomers]}
                    isChartDataLoading={areNonCustomersLoading}
                />
            </aside>
        </article>
    );
};
NonCustomers.stepTitle = stepNamesEnum.nonCustomers;

export default NonCustomers;
