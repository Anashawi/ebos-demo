import { IUserOrganizations } from "../../../models/organization";
import { IUserCustomers } from "../../../models/user-customers";
import { IUserGoals } from "../../../models/user-goal";
import { IUserProduct } from "../../../models/user-product";

// `org/goals` Visualize Success
export function getUserOrganizationsMsg(userOrgs: IUserOrganizations) {
    let chatGPTmsg = `Our organization's name is: ${userOrgs.organizations[0].name}. Our organization's website is: ${userOrgs.organizations[0].website}.`;
    for (let index = 1; index < userOrgs.organizations.length; index++) {
        if (index === 1)
            chatGPTmsg += ` Our competitors' organization names and websites are: `;
        if (index > 1) chatGPTmsg += `, `;
        chatGPTmsg += `${userOrgs.organizations[index].name} ${userOrgs.organizations[index].website}`;
    }

    return chatGPTmsg;
}
export function getUserGoalsMsg(usergoals: IUserGoals) {
    return `Goal date is: ${
        usergoals.targetDate
    }, goals are: ${usergoals.goals.join()}`;
}

// `org/products` Pioneer Migrator Settler
export function getCompanyProductMessage(userProduct: IUserProduct) {
    let msgForChatGPT = ``;
    for (let i = 0; i < userProduct.products.length; i++) {
        const product = userProduct.products[i];
        msgForChatGPT += `Product name: ${product.name}.`;
        for (let j = 0; j < product.futures!.length; j++) {
            const future = product.futures![j];
            if (j === 0) msgForChatGPT += ` Present ${future.year}:`;
            if (j > 0) msgForChatGPT += ` Date ${future.year}:`;

            let level = ``;
            if (future.level == 1) level = `Settler`;
            if (future.level == 2) level = `Migrator`;
            if (future.level == 3) level = `Pioneer`;

            msgForChatGPT += ` ${level} level with $${future.sales} in sales.`;
        }
    }

    return msgForChatGPT;
}

// `org/market-potential` Market Potential
export function getMarketPotentialMessage(userProduct: IUserProduct) {
    let msgForChatGPT = ``;
    for (let i = 0; i < userProduct.products.length; i++) {
        const product = userProduct.products[i];
        msgForChatGPT += `My Product's name is: ${
            product.name
        } and its market share is $${product.competitors![0].marketShare}.`;
        for (let j = 1; j < product.competitors!.length; j++) {
            const competitor = product.competitors![j];
            if (j === 1) msgForChatGPT += ` The untapped market is`;
            else msgForChatGPT += ` Competitor ${j - 1} is`;

            msgForChatGPT += ` ${competitor.name} and its market share is $${competitor.marketShare}.`;
        }
    }

    return msgForChatGPT;
}

// `org/red-ocean` Red Ocean Canvas
export function getRedOceanMessage(userProduct: IUserProduct) {
    let msgForChatGPT = ``;
    for (let i = 0; i < userProduct.products.length; i++) {
        const product = userProduct.products[i];
        msgForChatGPT += `For the: ${product.name}.`;
        for (let j = 0; j < product.factors!.length; j++) {
            const factor = product.factors![j];
            msgForChatGPT += ` The ${factor.name} factor `;

            for (let k = 0; k < factor.competitors.length; k++) {
                const competitor = factor.competitors[k];
                if (k === 1) continue; // untapped market is not used here
                if (k === factor.competitors.length - 1)
                    msgForChatGPT += `, and `;
                else msgForChatGPT += `, `;

                let level = ``;
                if (competitor.value == 1) level = `poor`;
                if (competitor.value == 2) level = `moderate`;
                if (competitor.value == 3) level = `good`;
                if (competitor.value == 4) level = `excellent`;

                msgForChatGPT += `is ${level} for ${
                    product.competitors![k].name
                }`;
            }
        }
    }

    return msgForChatGPT;
}

// `org/voice-of-customers` Voice of Customers
export function getVoiceOfCustomerMessage(userCustomers: IUserCustomers) {
    let msgForChatGPT = ``;
    for (let i = 0; i < userCustomers.topCategories.length; i++) {
        const topCustomer = userCustomers.topCategories[i];
        const wants = userCustomers.wishlist[i];
        const fulfill = userCustomers.fulfill[i];

        if (!topCustomer) continue;

        msgForChatGPT += `My ${topCustomer} wants ${wants} and to fulfill it: ${fulfill}`;
    }

    return msgForChatGPT;
}

// `org/blue-ocean` Blue Ocean Canvas
export function getBlueOceanMessage(userProduct: IUserProduct) {
    let msgForChatGPT = ``;
    for (let i = 0; i < userProduct.products.length; i++) {
        const product = userProduct.products[i];
        msgForChatGPT += `For the: ${product.name}.`;
        for (let j = 0; j < product.ideaFactors!.length; j++) {
            const factor = product.ideaFactors![j];
            msgForChatGPT += ` The ${factor.name} idea `;

            for (let k = 0; k < factor.competitors.length; k++) {
                const competitor = factor.competitors[k];
                if (k === 1) continue; // untapped market is not used here
                if (k === factor.competitors.length - 1)
                    msgForChatGPT += `, and `;
                else msgForChatGPT += `, `;

                let level = ``;
                if (competitor.value == 1) level = `poor`;
                if (competitor.value == 2) level = `moderate`;
                if (competitor.value == 3) level = `good`;
                if (competitor.value == 4) level = `excellent`;

                msgForChatGPT += `is ${level} for ${
                    product.competitors![k].name
                }`;
            }
        }
    }

    return msgForChatGPT;
}
