import { IUserOrganizations } from "../../../models/organization";
import { IFactor, IProduct } from "../../../models/types";
import { IUserAnalysis } from "../../../models/user-analysis";
import { IUserCustomers } from "../../../models/user-customers";
import { IUserGoals } from "../../../models/user-goal";
import { IUserIdeas } from "../../../models/user-idea";
import { IUserNonCustomers } from "../../../models/user-non-customers";
import { IUserProduct } from "../../../models/user-product";
import { IUserTakeaways } from "../../../models/user-takeaways";

// Step 1: `org/goals` Visualize Success
export function getUserOrganizationsMsg(userOrgs: IUserOrganizations) {

    if (!userOrgs || !userOrgs.organizations) return '';

    let chatGPTmsg = `Our organization's name is: ${userOrgs.organizations[0].name} and our organization's website is: ${userOrgs.organizations[0].website}.\n`;
    const competitorsListLength = userOrgs.organizations.length;

    // no competitors
    if (competitorsListLength === 1) return chatGPTmsg;

    chatGPTmsg += `Our competitors' organization names and websites are:\n`;
    for (let i = 1; i < competitorsListLength; i++) {
        chatGPTmsg += `- Competitor ${i}'s organization name is ${userOrgs.organizations[i].name} and their website is ${userOrgs.organizations[i].website}\n`;
    }

    return chatGPTmsg;
}
export function getUserGoalsMsg(usergoals: IUserGoals | undefined) {

    if (!usergoals) return ``;

    return `Our goals date is ${
        usergoals.targetDate
    } and they are: ${usergoals.goals.join()}.\n`;
}

// Step 2: `org/products` Pioneer Migrator Settler
export function getCompanyProductMessage(userProduct: IUserProduct) {
    let msgForChatGPT = ``;
    const productsListLength = userProduct.products.length;
    let product: IProduct | undefined = undefined;

    if (productsListLength === 0) return msgForChatGPT;

    msgForChatGPT += `Our Product${
        productsListLength === 1 ? ` is:` : `s are:`
    }\n`;

    for (let i = 0; i < productsListLength; i++) {
        product = userProduct.products[i];
        msgForChatGPT += `- ${product.name}`;

        if (!product.futures) return msgForChatGPT;

        for (let j = 0; j < product.futures!.length; j++) {
            const future = product.futures![j];
            if (j === 0)
                msgForChatGPT += ` in ${future.year} we have $${future.sales} in sales at a`;
            if (j === 1)
                msgForChatGPT += ` in ${future.year} we plan to have $${future.sales} in sales at a`;
            else if (j > 1)
                msgForChatGPT += ` and in ${future.year}, $${future.sales} in sales at a`;

            let level = ``;
            if (future.level == 1) level = `settler`;
            if (future.level == 2) level = `migrator`;
            if (future.level == 3) level = `pioneer`;

            msgForChatGPT += ` ${level} level,`;
        }
    }

    return msgForChatGPT;
}

// Step 3: `org/market-potential` Market Potential
export function getMarketPotentialMessage(userProduct: IUserProduct) {
    let msgForChatGPT = ``;

    if (!userProduct) return msgForChatGPT;

    for (let i = 0; i < userProduct.products.length; i++) {
        const product = userProduct.products[i];

        if (!product.competitors) return msgForChatGPT;

        msgForChatGPT += `My product's name is: ${
            product.name
        } and its market share is $${product.competitors![0].marketShare}.\n`;
        for (let j = 1; j < product.competitors!.length; j++) {
            const competitor = product.competitors![j];
            if (j === 1)
                msgForChatGPT += `The untapped market is ${competitor.name} and its market share is $${competitor.marketShare}.\n`;
            else {
                msgForChatGPT += `- Competitor ${j - 1} is ${
                    competitor.name
                } and their market share is $${competitor.marketShare}.\n`;
            }
        }
    }

    return msgForChatGPT;
}

// Step 4: `org/red-ocean` Red Ocean Canvas
export function getRedOceanMessage(userProduct: IUserProduct) {
    let msgForChatGPT = ``;
    const productsLength = userProduct.products.length;
    let product: IProduct | undefined;
    let factorsLength = 0;
    let factor: IFactor | undefined;
    let level = ``;

    for (let i = 0; i < productsLength; i++) {
        product = userProduct.products[i];

        if (!product.factors) return msgForChatGPT;

        factorsLength = product.factors!.length;
        msgForChatGPT += `For the ${product.name}:\n`;
        for (let j = 0; j < factorsLength; j++) {
            factor = product.factors![j];

            msgForChatGPT += `- The ${factor.name} factor`;
            for (let k = 0; k < factor.competitors.length; k++) {
                const competitor = factor.competitors[k];

                if (k === 0) msgForChatGPT += `, is `; // first
                else if (k === 1) continue; // untapped market is not used here
                else if (k < factor.competitors.length - 1)
                    msgForChatGPT += `, `; // in between
                else msgForChatGPT += `, and is `; // last

                if (competitor.value == 1) level = `poor`;
                if (competitor.value == 2) level = `moderate`;
                if (competitor.value == 3) level = `good`;
                if (competitor.value == 4) level = `excellent`;

                msgForChatGPT += `${level} for ${product.competitors![k].name}`;
            }
            msgForChatGPT += `.\n`;
        }
    }

    return msgForChatGPT;
}

// Step 5: `org/disruption` Disruption
export function getDisruptionMessage(userTakeaways: IUserTakeaways) {
    let msgForChatGPT = ``;
    const takeAwaysLength = userTakeaways.takeaways.length;
    let notesLength = 0;

    if (takeAwaysLength === 0 ) return msgForChatGPT;

    for (let i = 0; i < takeAwaysLength; i++) {
        notesLength = userTakeaways.takeaways[i].notes.length;

        if (notesLength === 0) continue;

        msgForChatGPT += `The takeaways ${
            userTakeaways.takeaways[i].type
        }:\n`;

        for (let j = 0; j < notesLength; j++) {
            msgForChatGPT += `- ${userTakeaways.takeaways[i].notes[j]}.\n`;
        }
    }

    return msgForChatGPT;
}

// Step 6: `org/voice-of-customers` Voice of Customers
export function getVoiceOfCustomerMessage(userCustomers: IUserCustomers) {
    let msgForChatGPT = ``;

    for (let i = 0; i < userCustomers.topCategories.length; i++) {
        const topCustomer = userCustomers.topCategories[i];
        const wants = userCustomers.wishlist[i];
        const fulfill = userCustomers.fulfill[i];

        if (!topCustomer) continue;

        msgForChatGPT += `- ${topCustomer} wants ${wants} and to fulfill it: ${fulfill}.\n`;
    }

    return msgForChatGPT;
}

// Step 7: `org/blue-ocean` Blue Ocean Canvas
export function getBlueOceanMessage(userProduct: IUserProduct) {
    let msgForChatGPT = ``;
    const productsLength = userProduct.products.length;
    let product: IProduct | undefined;
    let ideaFactorsLength = 0;
    let ideaFactor: IFactor | undefined;
    let level = ``;

    for (let i = 0; i < productsLength; i++) {
        product = userProduct.products[i];
        ideaFactorsLength = product.ideaFactors!.length;

        if (ideaFactorsLength === 0) return msgForChatGPT;

        msgForChatGPT += `For the ${product.name}:\n`;
        for (let j = 0; j < ideaFactorsLength; j++) {
            ideaFactor = product.ideaFactors![j];

            msgForChatGPT += `- The ${ideaFactor.name} factor`;
            for (let k = 0; k < ideaFactor.competitors.length; k++) {
                const competitor = ideaFactor.competitors[k];

                if (k === 0) msgForChatGPT += `, is `; // first
                else if (k === 1) continue; // untapped market is not used here
                else if (k < ideaFactor.competitors.length - 1)
                    msgForChatGPT += `, `; // in between
                else msgForChatGPT += `, and is `; // last

                if (competitor.value == 1) level = `poor`;
                if (competitor.value == 2) level = `moderate`;
                if (competitor.value == 3) level = `good`;
                if (competitor.value == 4) level = `excellent`;

                msgForChatGPT += `${level} for ${product.competitors![k].name}`;
            }
            msgForChatGPT += `.\n`;
        }
    }

    return msgForChatGPT;
}

// Step 8: `org/non-customers` Non Customers
export function getNonCustomersMessage(nonCustomers: IUserNonCustomers) {
    let msgForChatGPT = ``;
    msgForChatGPT += `The soon to be non customers are: ${nonCustomers.soonNonCustomers.join()}.\n`;
    msgForChatGPT += `The refusing non customers are: ${nonCustomers.refusingNonCustomers.join()}.\n`;
    msgForChatGPT += `The unwanted non customers are: ${nonCustomers.unwantedNonCustomers.join()}.\n`;

    return msgForChatGPT;
}

// Step 9: `org/step-up-step-down` Step-up step-down
export function getStepUpDownMessage(analysis: IUserAnalysis) {
    let msgForChatGPT = ``;
    msgForChatGPT += `The 10% step up customers are: ${analysis.above.join()}.\n`;
    msgForChatGPT += `The current customers are: ${analysis.customers.join()}.\n`;
    msgForChatGPT += `The 10% step down customers are: ${analysis.below.join()}.\n`;

    return msgForChatGPT;
}

// Step 10: `org/roadmap` Roadmap
export function getIdeasMessage(ideas: IUserIdeas) {
    let msgForChatGPT = ``;
    const ideasLength = ideas.ideas.length;

    if (ideasLength === 0) return msgForChatGPT;

    msgForChatGPT += `Starting from ${ideas.startDate} our idea`;
    if (ideasLength > 1) msgForChatGPT += `s are:\n`;
    else msgForChatGPT += ` is:\n`;

    for (let i = 0; i < ideasLength; i++) {
        msgForChatGPT += `- The idea is to ${
            ideas.ideas[i].name
        } starting from ${ideas.ideas[i].startMonth} and lasting for ${
            ideas.ideas[i].durationInMonths
        } Month${ideas.ideas[i].durationInMonths === 1 ? `` : `s`} \n`;
    }

    return msgForChatGPT;
}
