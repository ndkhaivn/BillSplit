tenant = {
    tenantName: "John Doe",
    stays: [
        {
            fromDate: "01/01/2019",
            toDate: "31/12/2019"
        },
        {
            fromDate: "05/02/2020",
            toDate: "09/05/2020"
        }
    ]
};

billType = {
    title: "Red Energy Electricity",
};

bill = {
    billTypeId: "8DeOVTcLb2tBTzRlaIPr",
    amount: 359.55,
    paymentDate: "05/05/2019",
    period: {
        fromDate: "01/01/2019",
        toDate: "31/03/2019"
    },
    split: [
        {
            tenantId: "RLtsdnjNl2tY01oOsz8D",
            days: 14, // 14 days stayed
            sharedAmount: 102.54 // $
        }
    ]
};