tenant = {
    tenantId: "8DeOVTcLb2tBTzRlaIPr",
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
    billTypeId: "8DeOVTcLb2tBTzRlaIPr",
    title: "Red Energy Electricity",
};

bill = {
    billId: "3Ty6RFcy36T8dnZnHSMO",
    billTypeId: "8DeOVTcLb2tBTzRlaIPr",
    amount: 359.55,
    paymentDate: "05/05/2019",
    period: {
        fromDate: "01/01/2019",
        toDate: "31/03/2019"
    },
    splits: [
        {
            tenantId: "RLtsdnjNl2tY01oOsz8D",
            days: 14, // 14 days stayed
            sharedAmount: 102.54 // $
        }
    ]
};