import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import * as analysisApi from "../../http-client/analysis.client";
import { useQuery } from "@tanstack/react-query";
import { IUserAnalysis } from "../../models/user-analysis";
import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";

import ActionsNavbar from "../../components/common/actions-navbar";
import StepsNavbar from "../../components/common/steps-navbar";
import StepUpStepDownContent from "../../components/step-up-step-down/step-up-step-down-content";
import ChartsContent from "../../components/common/charts-content";

const Analysis = () => {
    const { data: session }: any = useSession();

    const emptyUserAnalysis = {
        id: "",
        userId: session?.user?.id,
        above: [],
        below: [],
        customers: [],
    } as IUserAnalysis;

    const [userAnalysis, setUserAnalysis] =
        useState<IUserAnalysis>(emptyUserAnalysis);

    const { data: fetchedAnalysis, isLoading: isAnalysisLoading } =
        useQuery<IUserAnalysis>({
            queryKey: [analysisApi.Keys.All],
            queryFn: analysisApi.getOne,
            refetchOnWindowFocus: false,
            enabled: !!session?.user?.id,
        });

    useEffect(() => {
        if (fetchedAnalysis) {
            setUserAnalysis(fetchedAnalysis);
        }
    }, [fetchedAnalysis]);

    return (
        <div className="content-container">
            <header className="left-side-main-navigation">
                <ActionsNavbar
                    selectedStepTitle={stepNamesEnum.stepUpStepDownModel}
                />
            </header>
            <main className="right-side-step-content">
                <nav className="top-navigation">
                    <StepsNavbar
                        selectedNodeTitle={stepNamesEnum.stepUpStepDownModel}
                    />
                </nav>
                <article className="main-content">
                    <article className="forms-container">
                        <StepUpStepDownContent
                            userAnalysis={userAnalysis}
                            dispatchUserAnalysis={setUserAnalysis}
                            isLoading={isAnalysisLoading}
                        />
                    </article>
                    <aside className="aside-content">
                        <ChartsContent
                            videoPropName={
                                videoPropNamesEnum.stepUpStepDownModel
                            }
                            videoLabel="Step Up Step Down Model Video"
                            chartProducts={[userAnalysis]}
                            isChartDataLoading={isAnalysisLoading}
                        />
                    </aside>
                </article>
            </main>
        </div>
    );
};

export default Analysis;
