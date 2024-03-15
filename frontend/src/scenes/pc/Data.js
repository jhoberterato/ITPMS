import * as yup from "yup"
export const initialValues = {
    ipAddress: "",
    model: "",
    serialNo: "",
    name: "",
    type: "",
    warrantyDate: "",
    os: "",
    osKey: "",
    maker: "",
    macAddress: "",
    user: "",
    userIDNo: "",
    email: "",
    area: "",
    department: "",
    pmDate: ""
}

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const userSchema = yup.object().shape({
    ipAddress: yup.string().required("IP address is required"),
    model: yup.string().required("Model is required"),
    serialNo: yup.string().required("Serial number is required"),
    name: yup.string().required("PC name is required"),
    type: yup.string().required("Type is required"),
    warrantyDate: yup.string().required("Warranty date is required"),
    pmDate: yup.string().required("PM date is required"),
    os: yup.string().required("OS is required"),
    osKey: yup.string().required("OS key is required"),
    maker: yup.string().required("Maker is required"),
    macAddress: yup.string().required("Mac Address is required"),
    user: yup.string().required("User name is required"),
    userIDNo: yup.string().required("User ID number is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    area: yup.string().required("Area is required"),
    department: yup.string().required("Department is required"),
})

export const userTextField = (values, touched, errors) => {
    return [
        {
            label: "User's Name",
            value: values.user,
            name: 'user',
            error: !!touched.user && !!errors.user,
            helperText: touched.user && errors.user,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: "User's ID Number",
            value: values.userIDNo,
            name: 'userIDNo',
            error: !!touched.userIDNo && !!errors.userIDNo,
            helperText: touched.userIDNo && errors.userIDNo,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: "Email",
            value: values.email,
            name: 'email',
            error: !!touched.email && !!errors.email,
            helperText: touched.email && errors.email,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: "Area",
            value: values.area,
            name: 'area',
            error: !!touched.area && !!errors.area,
            helperText: touched.area && errors.area,
            category: {
                name: 'select',
                menu: ["CLEAN ROOM 0", "CLEAN ROOM 1-1", "CLEAN ROOM 1-2", "CLEAN ROOM 2", "CLEAN ROOM 3", "CLEAN ROOM 4", "CLINIC", "EX PPLAN", "EX PRE CLEANING", "EX SHIPPING", "GEN. OFFICE", "GEN. OFFICE/Near Shoe Locker", "HR", "IDM", "LOBBY", "MB CLEANROOM", "MB Coating", "MB OQA", "MB SHIPPING", "MEETING ROOM", "OLD SERVER ROOM", "SECURITY", "SERVER ROOM", "TBD", "Technical Room", "UDS"]
            }
        },
        {
            label: "Department",
            value: values.department,
            name: 'department',
            error: !!touched.department && !!errors.department,
            helperText: touched.department && errors.department,
            category: {
                name: 'select',
                menu: ["Admin HR", "EX Planning", "EX Production 1", "EX Production 2", "Facilities", "Finance", "MB Production", "OQA/PD Analysis", "Production Engg", "Purchasing Logistics", "Sales", "Systems", "Top Management"]
            }
        },
    ]
}

export const pcTextField = (values, touched, errors) => {
    return [
        {
            label: 'IP Adrress',
            value: values.ipAddress,
            name: 'ipAddress',
            error: !!touched.ipAddress && !!errors.ipAddress,
            helperText: touched.ipAddress && errors.ipAddress,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: 'Model',
            value: values.model,
            name: 'model',
            error: !!touched.model && !!errors.model,
            helperText: touched.model && errors.model,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: 'Serial Number',
            value: values.serialNo,
            name: 'serialNo',
            error: !!touched.serialNo && !!errors.serialNo,
            helperText: touched.serialNo && errors.serialNo,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: 'Name',
            value: values.name,
            name: 'name',
            error: !!touched.name && !!errors.name,
            helperText: touched.name && errors.name,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: 'Warranty Date',
            value: values.warrantyDate,
            name: 'warrantyDate',
            error: !!touched.warrantyDate && !!errors.warrantyDate,
            helperText: touched.warrantyDate && errors.warrantyDate,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: 'OS',
            value: values.os,
            name: 'os',
            error: !!touched.os && !!errors.os,
            helperText: touched.os && errors.os,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: 'OS Key',
            value: values.osKey,
            name: 'osKey',
            error: !!touched.osKey && !!errors.osKey,
            helperText: touched.osKey && errors.osKey,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: 'Maker',
            value: values.maker,
            name: 'maker',
            error: !!touched.maker && !!errors.maker,
            helperText: touched.maker && errors.maker,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: 'MAC Address',
            value: values.macAddress,
            name: 'macAddress',
            error: !!touched.macAddress && !!errors.macAddress,
            helperText: touched.macAddress && errors.macAddress,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: 'Type',
            value: values.type,
            name: 'type',
            error: !!touched.type && !!errors.type,
            helperText: touched.type && errors.type,
            category: {
                name: 'select',
                menu: ["Desktop", "Laptop", "Tablet", "Server"]
            }
        },
        {
            label: 'PM Date',
            value: values.pmDate,
            name: 'pmDate',
            error: !!touched.pmDate && !!errors.pmDate,
            helperText: touched.pmDate && errors.pmDate,
            category: {
                name: 'textfield',
                menu: []
            }
        },
    ]
}

export const returnStep = (value) => {
    const userArray = ['user', 'userIDNo', 'email', 'area', 'department']
    return userArray.includes(value) ? 2 : 1
}


/*------------------Edit----------------*/
export const editInitialVal = {
    id: 1,
    pmID: 0,
    ipAddress: "192.168.5.38",
    model: "Lenovo Thinkpad X280",
    serialNo: "PC-0V1ATU",
    name: "NMCP_LPC-261",
    type: "Laptop",
    warrantyDate: "2019-07-26",
    os: "Windows 10 /Professional - 1903",
    osKey: "Windows 10 /Professional - 1903",
    maker: "Lenovo",
    macAddress: "00-60-6E-43-2B-52",
    user: "J.Erato",
    userIDNo: "100 2 2223",
    email: "jerato@nmc-net.com",
    area: "GEN. OFFICE",
    department: "Systems",
    pmDate: "2024-02-22",
    lastPmDate: "2023-11-22",
    nextPmDate: "2024-05-22"
}

export const editValidation = yup.object().shape({
    ipAddress: yup.string().required("IP address is required"),
    model: yup.string().required("Model is required"),
    serialNo: yup.string().required("Serial number is required"),
    name: yup.string().required("PC name is required"),
    type: yup.string().required("Type is required"),
    warrantyDate: yup.string().required("Warranty date is required"),
    os: yup.string().required("OS is required"),
    osKey: yup.string().required("OS key is required"),
    maker: yup.string().required("Maker is required"),
    macAddress: yup.string().required("Mac Address is required"),
    user: yup.string().required("User name is required"),
    userIDNo: yup.string().required("User ID number is required"),
    email: yup.string().required("Email is required"),
    area: yup.string().required("Area is required"),
    department: yup.string().required("Department is required"),
    pmDate: yup.string().required("PM Date is required"),
    lastPmDate: yup.string().nullable(),
    nextPmDate: yup.string().required("Next PM Date is required"),
})

export const editUser = (values, touched, errors) => {
    return [
        {
            label: "User's Name",
            value: values.user,
            name: 'user',
            error: !!touched.user && !!errors.user,
            helperText: touched.user && errors.user,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: "User's ID Number",
            value: values.userIDNo,
            name: 'userIDNo',
            error: !!touched.userIDNo && !!errors.userIDNo,
            helperText: touched.userIDNo && errors.userIDNo,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: "Email",
            value: values.email,
            name: 'email',
            error: !!touched.email && !!errors.email,
            helperText: touched.email && errors.email,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: "Area",
            value: values.area,
            name: 'area',
            error: !!touched.area && !!errors.area,
            helperText: touched.area && errors.area,
            category: {
                name: 'select',
                menu: ["CLEAN ROOM 0", "CLEAN ROOM 1-1", "CLEAN ROOM 1-2", "CLEAN ROOM 2", "CLEAN ROOM 3", "CLEAN ROOM 4", "CLINIC", "EX PPLAN", "EX PRE CLEANING", "EX SHIPPING", "GEN. OFFICE", "GEN. OFFICE/Near Shoe Locker", "HR", "IDM", "LOBBY", "MB CLEANROOM", "MB Coating", "MB OQA", "MB SHIPPING", "MEETING ROOM", "OLD SERVER ROOM", "SECURITY", "SERVER ROOM", "TBD", "Technical Room", "UDS"]
            }
        },
        {
            label: "Department",
            value: values.department,
            name: 'department',
            error: !!touched.department && !!errors.department,
            helperText: touched.department && errors.department,
            category: {
                name: 'select',
                menu: ["Admin HR", "EX Planning", "EX Production 1", "EX Production 2", "Facilities", "Finance", "MB Production", "OQA/PD Analysis", "Production Engg", "Purchasing Logistics", "Sales", "Systems", "Top Management"]
            }
        },
    ]
}

export const editPC = (values, touched, errors) => {
    return [
        {
            label: 'IP Adrress',
            value: values.ipAddress,
            name: 'ipAddress',
            error: !!touched.ipAddress && !!errors.ipAddress,
            helperText: touched.ipAddress && errors.ipAddress,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: 'Model',
            value: values.model,
            name: 'model',
            error: !!touched.model && !!errors.model,
            helperText: touched.model && errors.model,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: 'Serial Number',
            value: values.serialNo,
            name: 'serialNo',
            error: !!touched.serialNo && !!errors.serialNo,
            helperText: touched.serialNo && errors.serialNo,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: 'Name',
            value: values.name,
            name: 'name',
            error: !!touched.name && !!errors.name,
            helperText: touched.name && errors.name,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: 'Warranty Date',
            value: values.warrantyDate,
            name: 'warrantyDate',
            error: !!touched.warrantyDate && !!errors.warrantyDate,
            helperText: touched.warrantyDate && errors.warrantyDate,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: 'OS',
            value: values.os,
            name: 'os',
            error: !!touched.os && !!errors.os,
            helperText: touched.os && errors.os,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: 'OS Key',
            value: values.osKey,
            name: 'osKey',
            error: !!touched.osKey && !!errors.osKey,
            helperText: touched.osKey && errors.osKey,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: 'Maker',
            value: values.maker,
            name: 'maker',
            error: !!touched.maker && !!errors.maker,
            helperText: touched.maker && errors.maker,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: 'MAC Address',
            value: values.macAddress,
            name: 'macAddress',
            error: !!touched.macAddress && !!errors.macAddress,
            helperText: touched.macAddress && errors.macAddress,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: 'Type',
            value: values.type,
            name: 'type',
            error: !!touched.type && !!errors.type,
            helperText: touched.type && errors.type,
            category: {
                name: 'select',
                menu: ["Desktop", "Laptop", "Tablet", "Server"]
            }
        },
    ]
}

export const editPM = (values, touched, errors) => {
    return [
        {
            label: 'PM Date',
            value: values.pmDate,
            name: 'pmDate',
            error: !!touched.pmDate && !!errors.pmDate,
            helperText: touched.pmDate && errors.pmDate,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: 'Last PM Date',
            value: values.lastPmDate,
            name: 'lastPmDate',
            error: !!touched.lastPmDate && !!errors.lastPmDate,
            helperText: touched.lastPmDate && errors.lastPmDate,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: 'Next PM Date',
            value: values.nextPmDate,
            name: 'nextPmDate',
            error: !!touched.nextPmDate && !!errors.nextPmDate,
            helperText: touched.nextPmDate && errors.nextPmDate,
            category: {
                name: 'textfield',
                menu: []
            }
        },
    ]
}

export const returnEditStep = (value) => {
    let step = 0
    const userArray = ['user', 'userIDNo', 'email', 'area', 'department']
    const pmArray = ["pmDate", "lastPmDate", "nextPmDate"]
    if(userArray.includes(value)){
        step = 1
    }
    else{
        step = pmArray.includes(value) ? 3 : 2
    }
    return step
}