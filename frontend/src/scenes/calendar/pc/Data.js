import * as yup from "yup"

export const initialValues = {
    id: 1,
    internetAccess: "Finish",
    softwareInstalled: "",
    virusUpdate: "",
    virusRemoval: "",
    diskCleanup: "",
    empytRecycleBin: "",
    clearTempFiles: "",
    kmMouseFunctionality: "",
    inboxMaintenance: "",
    spamMailRemoval: "",
    emailSampling: "",
    businessProcessRelated: "",
    offense: "",
    chainEmails: "",
    windowsUpdate: "",
    pic: "jerato",
    remarks: "",
}

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export let pmSchema = yup.object().shape({
    id: yup.number().required("ID is required"),
    internetAccess: yup.string().required("Internet access is required"),
    softwareInstalled: yup.string().required("Authorized software installed is required"),
    virusUpdate: yup.string().required("Virus definition update is required"),
    virusRemoval: yup.string().required("Virus scanning/removal is required"),
    diskCleanup: yup.string().required("Disk cleanup is required"),
    empytRecycleBin: yup.string().required("Empty recycle bin is required"),
    clearTempFiles: yup.string().required("Clear temporary internet files is required"),
    kmMouseFunctionality: yup.string().required("Keyboard and mouse functionality is required"),
    inboxMaintenance: yup.string().required("Inbox maintenance is required"),
    spamMailRemoval: yup.string().required("Spam mail removal is required"),
    emailSampling: yup.string().required("Five email sampling is required"),
    businessProcessRelated: yup.string().required("Business/process related is required"),
    offense: yup.string().required("Offense is required"),
    chainEmails: yup.string().required("Chain emails is required"),
    windowsUpdate: yup.string().required("Windows update is required"),
    pic: yup.string().required("PIC is required"),
    remarks: yup.string().nullable(),
})

export const pmTextField = (values, touched, errors) => {
    return [
        {
            label: "Internet Access",
            value: values.internetAccess,
            name: 'internetAccess',
            error: !!touched.internetAccess && !!errors.internetAccess,
            helperText: touched.internetAccess && errors.internetAccess,
            category: {
                name: 'select',
                menu: ["Finish", "Not Applicable", "Error/Problem"]
            }
        },
        {
            label: "Authorized Software Installed",
            value: values.softwareInstalled,
            name: 'softwareInstalled',
            error: !!touched.softwareInstalled && !!errors.softwareInstalled,
            helperText: touched.softwareInstalled && errors.softwareInstalled,
            category: {
                name: 'select',
                menu: ["Finish", "Not Applicable", "Error/Problem"]
            }
        },
        {
            label: "Virus Definition Update",
            value: values.virusUpdate,
            name: 'virusUpdate',
            error: !!touched.virusUpdate && !!errors.virusUpdate,
            helperText: touched.virusUpdate && errors.virusUpdate,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: "Virus Scanning/Removal",
            value: values.virusRemoval,
            name: 'virusRemoval',
            error: !!touched.virusRemoval && !!errors.virusRemoval,
            helperText: touched.virusRemoval && errors.virusRemoval,
            category: {
                name: 'select',
                menu: ["Finish", "Not Applicable", "Error/Problem"]
            }
        },
        {
            label: "Disk Cleanup",
            value: values.diskCleanup,
            name: 'diskCleanup',
            error: !!touched.diskCleanup && !!errors.diskCleanup,
            helperText: touched.diskCleanup && errors.diskCleanup,
            category: {
                name: 'select',
                menu: ["Finish", "Not Applicable", "Error/Problem"]
            }
        },
        {
            label: "Empty Recycle Bin",
            value: values.empytRecycleBin,
            name: 'empytRecycleBin',
            error: !!touched.empytRecycleBin && !!errors.empytRecycleBin,
            helperText: touched.empytRecycleBin && errors.empytRecycleBin,
            category: {
                name: 'select',
                menu: ["Finish", "Not Applicable", "Error/Problem"]
            }
        },
        {
            label: "Clear Temporary Internet Files",
            value: values.clearTempFiles,
            name: 'clearTempFiles',
            error: !!touched.clearTempFiles && !!errors.clearTempFiles,
            helperText: touched.clearTempFiles && errors.clearTempFiles,
            category: {
                name: 'select',
                menu: ["Finish", "Not Applicable", "Error/Problem"]
            }
        },
        {
            label: "Keyboard, Mouse Functionality",
            value: values.kmMouseFunctionality,
            name: 'kmMouseFunctionality',
            error: !!touched.kmMouseFunctionality && !!errors.kmMouseFunctionality,
            helperText: touched.kmMouseFunctionality && errors.kmMouseFunctionality,
            category: {
                name: 'select',
                menu: ["Finish", "Not Applicable", "Error/Problem"]
            }
        },
        {
            label: "Inbox Maintenance (Archival)",
            value: values.inboxMaintenance,
            name: 'inboxMaintenance',
            error: !!touched.inboxMaintenance && !!errors.inboxMaintenance,
            helperText: touched.inboxMaintenance && errors.inboxMaintenance,
            category: {
                name: 'select',
                menu: ["Finish", "Not Applicable", "Error/Problem"]
            }
        },
        {
            label: "Spam Mail Removal",
            value: values.spamMailRemoval,
            name: 'spamMailRemoval',
            error: !!touched.spamMailRemoval && !!errors.spamMailRemoval,
            helperText: touched.spamMailRemoval && errors.spamMailRemoval,
            category: {
                name: 'select',
                menu: ["Finish", "Not Applicable", "Error/Problem"]
            }
        },
        {
            label: "Five Email Sampling",
            value: values.emailSampling,
            name: 'emailSampling',
            error: !!touched.emailSampling && !!errors.emailSampling,
            helperText: touched.emailSampling && errors.emailSampling,
            category: {
                name: 'select',
                menu: ["Finish", "Not Applicable", "Error/Problem"]
            }
        },
        {
            label: "Business/Process Related",
            value: values.businessProcessRelated,
            name: 'businessProcessRelated',
            error: !!touched.businessProcessRelated && !!errors.businessProcessRelated,
            helperText: touched.businessProcessRelated && errors.businessProcessRelated,
            category: {
                name: 'select',
                menu: ["Finish", "Not Applicable", "Error/Problem"]
            }
        },
        {
            label: "Offense",
            value: values.offense,
            name: 'offense',
            error: !!touched.offense && !!errors.offense,
            helperText: touched.offense && errors.offense,
            category: {
                name: 'select',
                menu: ["Finish", "Not Applicable", "Error/Problem"]
            }
        },
        {
            label: "Chain Emails",
            value: values.chainEmails,
            name: 'chainEmails',
            error: !!touched.chainEmails && !!errors.chainEmails,
            helperText: touched.chainEmails && errors.chainEmails,
            category: {
                name: 'select',
                menu: ["Finish", "Not Applicable", "Error/Problem"]
            }
        },
        {
            label: "Windows Update",
            value: values.windowsUpdate,
            name: 'windowsUpdate',
            error: !!touched.windowsUpdate && !!errors.windowsUpdate,
            helperText: touched.windowsUpdate && errors.windowsUpdate,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: "Remarks",
            value: values.remarks,
            name: 'remarks',
            error: !!touched.remarks && !!errors.remarks,
            helperText: touched.remarks && errors.remarks,
            category: {
                name: 'textfield',
                menu: []
            }
        },
    ]
}