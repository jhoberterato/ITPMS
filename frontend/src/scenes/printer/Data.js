import * as yup from "yup"
export const initialValues = {
    model: '',
    serialNo: '',
    area: '',
    pmDate: ''
}

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const userSchema = yup.object().shape({
    model: yup.string().required("Model is required"),
    serialNo: yup.string().required("Serial number is required"),
    area: yup.string().required("Area is required"),
    pmDate: yup.string().required("PM Date is required"),
})

export const printerTextField = (values, touched, errors) => {
    return [
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
            label: 'Area',
            value: values.area,
            name: 'area',
            error: !!touched.area && !!errors.area,
            helperText: touched.area && errors.area,
            category: {
                name: 'select',
                menu: ["DRAWING", "DRAWING EX1p", "EX. SHIPPING", "GEN. OFFICE", "IDM", "MB. SHIPPING", "PACKING", "PRE-CLEAN", "QA", "REWINDING", "SHIPPING", "SPOOL VISUAL", "SS ANNEALING", "SYSTEMS", "TECHNICAL (CR 0)", "TECHNICAL (CR 2)", "TECHNICAL (CR 4)", "TECHNICAL (TECH. ROOM)", "Temp VI", "TEMPERING", "TEMPERING EX1p", "UPPER PROCESS", "VISUAL", "WAREHOUSE", "WM"]
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

/*------------------Edit----------------*/
export const editInitialVal = {
    id: 0,
    pmID: 0,
    model: "Brother QL-820NWB",
    serialNo: "E7761E82353866",
    area: "GEN. OFFICE",
    pmDate: "2024-02-22",
    lastPmDate: "2023-11-22",
    nextPmDate: "2024-05-22"
}

export const editValidation = yup.object().shape({
    model: yup.string().required("Model is required"),
    serialNo: yup.string().required("Serial number is required"),
    area: yup.string().required("Area is required"),
    pmDate: yup.string().required("PM Date is required"),
    lastPmDate: yup.string().required("Last PM Date is required"),
    nextPmDate: yup.string().required("Next PM Date is required"),
})

export const editPC = (values, touched, errors) => {
    return [
        
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
            label: 'Area',
            value: values.area,
            name: 'area',
            error: !!touched.area && !!errors.area,
            helperText: touched.area && errors.area,
            category: {
                name: 'select',
                menu: ["DRAWING", "DRAWING EX1p", "EX. SHIPPING", "GEN. OFFICE", "IDM", "MB. SHIPPING", "PACKING", "PRE-CLEAN", "QA", "REWINDING", "SHIPPING", "SPOOL VISUAL", "SS ANNEALING", "SYSTEMS", "TECHNICAL (CR 0)", "TECHNICAL (CR 2)", "TECHNICAL (CR 4)", "TECHNICAL (TECH. ROOM)", "Temp VI", "TEMPERING", "TEMPERING EX1p", "UPPER PROCESS", "VISUAL", "WAREHOUSE", "WM"]
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