import { IUserOrganizations } from "../../../models/organization";
import { ICompetitor, IFactor, IFactorCompetitor, IFuture, IIdeaFactor, IProduct } from "../../../models/types";
import { IUserAnalysis } from "../../../models/user-analysis";
import { IUserCustomers } from "../../../models/user-customers";
import { IUserGoals } from "../../../models/user-goal";
import { IUserIdeas } from "../../../models/user-idea";
import { IUserNonCustomers } from "../../../models/user-non-customers";
import { IUserProduct } from "../../../models/user-product";
import { IUserTakeaways } from "../../../models/user-takeaways";

// Step 1: `org/goals` Visualize Success
export function getUserOrganizationsMsg(userOrgs: IUserOrganizations) {
    let chatGPTmsg = `The user haven't entered their organization's name or website or any competitor.`;

    if (!userOrgs || userOrgs.organizations?.length === 0) return chatGPTmsg;

    const orgs = userOrgs.organizations;
    const competitorsListLength = orgs.length - 1; // 0: own org, 1+: comp orgs

    chatGPTmsg = `The organization's name is: ${orgs[0].name} and our organization's website is: ${orgs[0].website}.\n`;

    if (competitorsListLength === 0) return chatGPTmsg;

    chatGPTmsg += `It's competitors' organization names and websites are:\n`;
    for (let i = 1; i < competitorsListLength; i++) {
        chatGPTmsg += `- Competitor ${i}'s organization name is ${orgs[i].name} and their website is ${orgs[i].website}\n`;
    }

    return chatGPTmsg;
}
export function getUserGoalsMsg(usergoals: IUserGoals | undefined) {
    let chatGPTmsg = `The user haven't entered a goals' target date or any goal.`;

    if (!usergoals || usergoals.goals?.length === 0) return chatGPTmsg;

    chatGPTmsg = `The goals' date is ${usergoals.targetDate} and they are:\n${usergoals.goals.join()}.\n`;

    return chatGPTmsg;
}

// Step 2: `org/products` Pioneer Migrator Settler
export function getCompanyProductMessage(userProduct: IUserProduct) {
    let msgForChatGPT = `The user haven't entered any products yet.`;
    let product = {} as IProduct;
    let future = {} as IFuture; 
    let level = ``;
    let i = 0, j = 0;

    if (!userProduct || userProduct.products.length === 0) return msgForChatGPT;

    msgForChatGPT = `The product${userProduct.products.length === 1 ? ` is:` : `s are:`}\n`;

    for (i = 0; i < userProduct.products.length; i++) {
        product = userProduct.products[i];
        msgForChatGPT += `- ${product.name}:\n`;

        if (!product.futures) continue;

        for (j = 0; j < product.futures.length; j++) {
            future = product.futures[j];

            if (future.level === 1) level = `settler`;
            else if (future.level === 2) level = `migrator`;
            else if (future.level === 3) level = `pioneer`;

            msgForChatGPT += `  - in ${future.year} we ${ j > 0 ? `plan to ` : ``}have $${future.sales} in sales at a ${level} level.\n`;
        }
    }

    return msgForChatGPT;
}

// Step 3: `org/market-potential` Market Potential
export function getMarketPotentialMessage(userProduct: IUserProduct | undefined) {
    let msgForChatGPT = `The user haven't entered any market share.`;
    let product = {} as IProduct; 
    let competitor = {} as ICompetitor;
    let i, j = 0;

    if (!userProduct) return msgForChatGPT;

    msgForChatGPT = `The market potential data is:\n`;
    for (i = 0; i < userProduct.products.length; i++) {
        product = userProduct.products[i];

        if (!product.competitors) return msgForChatGPT;

        msgForChatGPT += `- For ${product.name} product:\n`;
        for (j = 0; j < product.competitors!.length; j++) {
            competitor = product.competitors![j];

            if (j === 0) msgForChatGPT += `  - Our market share is $${product.competitors![0].marketShare}.\n`;
            else if (j === 1) msgForChatGPT += `  - The untapped market is ${competitor.name} and its market share is $${competitor.marketShare}.\n`;
            else msgForChatGPT += `  - Competitor ${j - 1} is ${competitor.name} and their market share is $${competitor.marketShare}.\n`;
        }
    }

    return msgForChatGPT;
}

// Step 4: `org/red-ocean` Red Ocean Canvas
export function getRedOceanMessage(userProduct: IUserProduct | undefined) {
    let msgForChatGPT = `The user haven't entered any factors yet`;

    if (!userProduct) return msgForChatGPT

    let product = {} as IProduct;
    let factor = {} as IFactor;
    let factorCompetitor = {} as IFactorCompetitor;
    let i, j, k = 0;
    let level = ``;

    msgForChatGPT = `The red ocean canvas factors are:\n`;
    for (i = 0; i < userProduct.products.length; i++) {
        product = userProduct.products[i];
        msgForChatGPT += `- ${product.name}:\n`;

        if (!product.factors) {
            msgForChatGPT += `The user haven't entered any factors for this product.\n`;
            continue;
        }

        for (j = 0; j < product.factors.length; j++) {
            factor = product.factors![j];
            msgForChatGPT += `  - The ${factor.name} factor`;

            for (k = 0; k < factor.competitors.length; k++) {
                factorCompetitor = factor.competitors[k];

                if (k < factor.competitors.length - 1) msgForChatGPT += `, `;
                else if (k === 0) msgForChatGPT += `, is `;
                else if (k === 1) continue; // untapped market is not used here
                else if (k === factor.competitors.length - 1) msgForChatGPT += `, and is `;

                if (factorCompetitor.value == 1) level = `poor`;
                else if (factorCompetitor.value == 2) level = `moderate`;
                else if (factorCompetitor.value == 3) level = `good`;
                else if (factorCompetitor.value == 4) level = `excellent`;

                msgForChatGPT += `${level} for ${product.competitors![k].name}`;
            }
            msgForChatGPT += `.\n`;
        }
    }

    return msgForChatGPT;
}

// Step 5: `org/disruption` Disruption
export function getDisruptionMessage(userTakeaways: IUserTakeaways | undefined) {
    let msgForChatGPT = `The user haven't entered any takeaways`;

    if (!userTakeaways) return msgForChatGPT;

    const takeAwaysLength = userTakeaways.takeaways.length;
    let notesLength, i, j = 0;

    msgForChatGPT = `The takeaways are:\n`;
    for (i = 0; i < takeAwaysLength; i++) {
        notesLength = userTakeaways.takeaways[i].notes.length;
        msgForChatGPT += `- ${userTakeaways.takeaways[i].type}:\n`;

        if (notesLength === 0) {
            msgForChatGPT += `The user haven't entered any takeaways.\n`;
            continue;
        }

        for (j = 0; j < notesLength; j++) {
            msgForChatGPT += `  - ${userTakeaways.takeaways[i].notes[j]}.\n`;
        }
    }

    return msgForChatGPT;
}

// Step 6: `org/voice-of-customers` Voice of Customers
export function getVoiceOfCustomerMessage(userCustomers: IUserCustomers) {
    let msgForChatGPT = `The user haven't entered any voices of customers.`;
    let topCustomer, wants, fulfill = ``;

    if (!userCustomers) return msgForChatGPT;

    msgForChatGPT = `The top customer categories are:\n`;
    for (let i = 0; i < userCustomers.topCategories.length; i++) {
        topCustomer = userCustomers.topCategories[i];
        wants = userCustomers.wishlist[i];
        fulfill = userCustomers.fulfill[i];

        if (!topCustomer) continue;

        msgForChatGPT += `- ${topCustomer} wants ${wants} and to fulfill it: ${fulfill}.\n`;
    }

    return msgForChatGPT;
}

// Step 7: `org/blue-ocean` Blue Ocean Canvas
export function getBlueOceanMessage(userProduct: IUserProduct | undefined) {
    let msgForChatGPT = `The user haven't entered any blue ocean ideas yet.`;

    if (!userProduct) return msgForChatGPT;

    const productsLength = userProduct.products.length;
    let product = {} as IProduct;
    let ideaFactor = {} as IIdeaFactor;
    let ideaFactorCompetitor = {} as IFactorCompetitor;
    let ideaFactorsLength, i, j, k = 0;
    let level = ``;

    
    msgForChatGPT = `The blue ocean canvas ideas are:\n`;
    for (i = 0; i < productsLength; i++) {
        product = userProduct.products[i];
        ideaFactorsLength = product.ideaFactors!.length;

        if (ideaFactorsLength) {
            msgForChatGPT += `The user haven't entered any ideas for this product.\n`;
            continue;
        }

        msgForChatGPT += `- ${product.name}:\n`;
        for (j = 0; j < ideaFactorsLength; j++) {
            ideaFactor = product.ideaFactors![j];

            msgForChatGPT += `  - The ${ideaFactor.name} factor`;
            for (k = 0; k < ideaFactor.competitors.length; k++) {
                ideaFactorCompetitor = ideaFactor.competitors[k];

                if (k === 0) msgForChatGPT += `, is `; // first
                else if (k === 1) continue; // untapped market is not used here
                else if (k < ideaFactor.competitors.length - 1)
                    msgForChatGPT += `, `; // in between
                else msgForChatGPT += `, and is `; // last

                if (ideaFactorCompetitor.value == 1) level = `poor`;
                if (ideaFactorCompetitor.value == 2) level = `moderate`;
                if (ideaFactorCompetitor.value == 3) level = `good`;
                if (ideaFactorCompetitor.value == 4) level = `excellent`;

                msgForChatGPT += `${level} for ${product.competitors![k].name}`;
            }
            msgForChatGPT += `.\n`;
        }
    }

    return msgForChatGPT;
}

// Step 8: `org/non-customers` Non Customers
export function getNonCustomersMessage(nonCustomers: IUserNonCustomers) {
    let msgForChatGPT = `The user haven't entered any non customers logic.`;

    if (!nonCustomers) return msgForChatGPT;

    msgForChatGPT = `The soon to be non customers are: ${nonCustomers.soonNonCustomers.join()}.\n`;
    msgForChatGPT += `The refusing non customers are: ${nonCustomers.refusingNonCustomers.join()}.\n`;
    msgForChatGPT += `The unwanted non customers are: ${nonCustomers.unwantedNonCustomers.join()}.\n`;

    return msgForChatGPT;
}

// Step 9: `org/step-up-step-down` Step-up step-down
export function getStepUpDownMessage(analysis: IUserAnalysis) {
    let msgForChatGPT = `The user haven't entered any step-up step-down logic.`;

    if (!analysis) return msgForChatGPT;

    msgForChatGPT = `The 10% step up customers are: ${analysis.above.join()}.\n`;
    msgForChatGPT += `The current customers are: ${analysis.customers.join()}.\n`;
    msgForChatGPT += `The 10% step down customers are: ${analysis.below.join()}.\n`;

    return msgForChatGPT;
}

// Step 10: `org/roadmap` Roadmap
export function getIdeasMessage(ideas: IUserIdeas) {
    let msgForChatGPT = `The user haven't entered any roadmap ideas yet.`;

    if (!ideas || ideas.ideas.length === 0) return msgForChatGPT;
    
    msgForChatGPT = `Starting from ${ideas.startDate} our idea`;
    if (ideas.ideas.length > 1) msgForChatGPT += `s are:\n`;
    else msgForChatGPT += ` is:\n`;

    for (let i = 0; i < ideas.ideas.length; i++) {
        msgForChatGPT += `- The idea is to ${
            ideas.ideas[i].name
        } starting from ${ideas.ideas[i].startMonth} and lasting for ${
            ideas.ideas[i].durationInMonths
        } Month${ideas.ideas[i].durationInMonths === 1 ? `` : `s`} \n`;
    }

    return msgForChatGPT;
}
