import * as yup from "yup"

export const initialValues = {
    id: 1,
    cover: "",
    rollerNotLoose: "",
    rollerClean: "",
    cuttersSharp: "",
    cuttersClean: "",
    feedButton: "",
    cutButton: "",
    labelOutlet: "",
    pic: "jerato",
    remarks: "",
}

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const brotherSchema = yup.object().shape({
    id: yup.number().required("ID is required"),
    cover: yup.string().required("Cover is required"),
    coverAction: yup.string().nullable(),
    rollerNotLoose: yup.string().required("Roller (Not Loose) is required"),
    rollerNotLooseAction: yup.string().nullable(),
    rollerClean: yup.string().required("Roller (Clean) is required"),
    rollerCleanAction: yup.string().nullable(),
    cuttersSharp: yup.string().required("Cutters (Sharp) are required"),
    cuttersSharpAction: yup.string().nullable(),
    cuttersClean: yup.string().required("Cutters (Clean) are required"),
    cuttersCleanAction: yup.string().nullable(),
    feedButton: yup.string().required("Feed button is required"),
    feedButtonAction: yup.string().nullable(),
    cutButton: yup.string().required("Cut button is required"),
    cutButtonAction: yup.string().nullable(),
    labelOutlet: yup.string().required("Label Outlet is required"),
    labelOutletAction: yup.string().nullable(),
    pic: yup.string().required("PIC is required"),
    remarks: yup.string().nullable(),
})
export const epsonSchema = yup.object().shape({
        id: yup.number().required("ID is required"),
        cover: yup.string().required("Cover is required"),
        coverAction: yup.string().nullable(),
        ribbonWinding: yup.string().required("Ribbon Winding is required"),
        ribbonWindingAction: yup.string().nullable(),
        headerLockLever: yup.string().required("Header Loack Lever is required"),
        headerLockLeverAction: yup.string().nullable(),
        thermalHeader: yup.string().required("Thermal Header is required"),
        thermalHeaderAction: yup.string().nullable(),
        rollerClean: yup.string().required("Rollers is required"),
        rollerCleanAction: yup.string().nullable(),
        pitch: yup.string().required("Pitch is required"),
        pitchAction: yup.string().nullable(),
        offset: yup.string().required("Offset is required"),
        offsetAction: yup.string().nullable(),
        darkness: yup.string().required("Darkness is required"),
        darknessAction: yup.string().nullable(),
        speed: yup.string().required("Speed is required"),
        speedAction: yup.string().nullable(),
        pic: yup.string().required("PIC is required"),
        remarks: yup.string().nullable(),
})

export const brotherTextField = (values, touched, errors) => {
    return [
        {
            label: "Cover (Not Loose)",
            value: values.cover,
            name: 'cover',
            error: !!touched.cover && !!errors.cover,
            helperText: touched.cover && errors.cover,
            category: {
                name: 'select',
                menu: ["No Problem", "Needs Adjustment", "Needs Repair/Replacement"]
            }
        },
        {
            label: "Cover (Not Loose) Action",
            value: values.coverAction,
            name: 'coverAction',
            error: !!touched.coverAction && !!errors.coverAction,
            helperText: touched.coverAction && errors.coverAction,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: "Roller (Not Loose)",
            value: values.rollerNotLoose,
            name: 'rollerNotLoose',
            error: !!touched.rollerNotLoose && !!errors.rollerNotLoose,
            helperText: touched.rollerNotLoose && errors.rollerNotLoose,
            category: {
                name: 'select',
                menu: ["No Problem", "Needs Adjustment", "Needs Repair/Replacement"]
            }
        },
        {
            label: "Roller (Not Loose) Action",
            value: values.rollerNotLooseAction,
            name: 'rollerNotLooseAction',
            error: !!touched.rollerNotLooseAction && !!errors.rollerNotLooseAction,
            helperText: touched.rollerNotLooseAction && errors.rollerNotLooseAction,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: "Roller (Clean)",
            value: values.rollerClean,
            name: 'rollerClean',
            error: !!touched.rollerClean && !!errors.rollerClean,
            helperText: touched.rollerClean && errors.rollerClean,
            category: {
                name: 'select',
                menu: ["No Problem", "Needs Adjustment", "Needs Repair/Replacement"]
            }
        },
        {
            label: "Roller (Clean) Action",
            value: values.rollerCleanAction,
            name: 'rollerCleanAction',
            error: !!touched.rollerCleanAction && !!errors.rollerCleanAction,
            helperText: touched.rollerCleanAction && errors.rollerCleanAction,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: "Cutters (Sharp)",
            value: values.cuttersSharp,
            name: 'cuttersSharp',
            error: !!touched.cuttersSharp && !!errors.cuttersSharp,
            helperText: touched.cuttersSharp && errors.cuttersSharp,
            category: {
                name: 'select',
                menu: ["No Problem", "Needs Adjustment", "Needs Repair/Replacement"]
            }
        },
        {
            label: "Cutters (Sharp) Action",
            value: values.cuttersSharpAction,
            name: 'cuttersSharpAction',
            error: !!touched.cuttersSharpAction && !!errors.cuttersSharpAction,
            helperText: touched.cuttersSharpAction && errors.cuttersSharpAction,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: "Cutters (Clean)",
            value: values.cuttersClean,
            name: 'cuttersClean',
            error: !!touched.cuttersClean && !!errors.cuttersClean,
            helperText: touched.cuttersClean && errors.cuttersClean,
            category: {
                name: 'select',
                menu: ["No Problem", "Needs Adjustment", "Needs Repair/Replacement"]
            }
        },
        {
            label: "Cutters (Clean) Action",
            value: values.cuttersCleanAction,
            name: 'cuttersCleanAction',
            error: !!touched.cuttersCleanAction && !!errors.cuttersCleanAction,
            helperText: touched.cuttersCleanAction && errors.cuttersCleanAction,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: "Feed Button (Working)",
            value: values.feedButton,
            name: 'feedButton',
            error: !!touched.feedButton && !!errors.feedButton,
            helperText: touched.feedButton && errors.feedButton,
            category: {
                name: 'select',
                menu: ["No Problem", "Needs Adjustment", "Needs Repair/Replacement"]
            }
        },
        {
            label: "Feed Button (Working) Action",
            value: values.feedButtonAction,
            name: 'feedButtonAction',
            error: !!touched.feedButtonAction && !!errors.feedButtonAction,
            helperText: touched.feedButtonAction && errors.feedButtonAction,
            category: {
                name: 'textfield',
                menu: [""]
            }
        },
        {
            label: "Cut Button (Working)",
            value: values.cutButton,
            name: 'cutButton',
            error: !!touched.cutButton && !!errors.cutButton,
            helperText: touched.cutButton && errors.cutButton,
            category: {
                name: 'select',
                menu: ["No Problem", "Needs Adjustment", "Needs Repair/Replacement"]
            }
        },
        {
            label: "Cut Button (Working) Action",
            value: values.cutButtonAction,
            name: 'cutButtonAction',
            error: !!touched.cutButtonAction && !!errors.cutButtonAction,
            helperText: touched.cutButtonAction && errors.cutButtonAction,
            category: {
                name: 'textfield',
                menu: [""]
            }
        },
        {
            label: "Label Outlet (Clean)",
            value: values.labelOutlet,
            name: 'labelOutlet',
            error: !!touched.labelOutlet && !!errors.labelOutlet,
            helperText: touched.labelOutlet && errors.labelOutlet,
            category: {
                name: 'select',
                menu: ["No Problem", "Needs Adjustment", "Needs Repair/Replacement"]
            }
        },
        {
            label: "Label Outlet (Clean) Action",
            value: values.labelOutletAction,
            name: 'labelOutletAction',
            error: !!touched.labelOutletAction && !!errors.labelOutletAction,
            helperText: touched.labelOutletAction && errors.labelOutletAction,
            category: {
                name: 'textfield',
                menu: [""]
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

export const epsonTextField = (values, touched, errors) => {
    return [
        {
            label: "Cover (Not Loose)",
            value: values.cover,
            name: 'cover',
            error: !!touched.cover && !!errors.cover,
            helperText: touched.cover && errors.cover,
            category: {
                name: 'select',
                menu: ["No Problem", "Needs Adjustment", "Needs Repair/Replacement"]
            }
        },
        {
            label: "Cover (Not Loose) Action",
            value: values.coverAction,
            name: 'coverAction',
            error: !!touched.coverAction && !!errors.coverAction,
            helperText: touched.coverAction && errors.coverAction,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: "Ribbon Winding (Not Loose)",
            value: values.ribbonWinding,
            name: 'ribbonWinding',
            error: !!touched.ribbonWinding && !!errors.ribbonWinding,
            helperText: touched.ribbonWinding && errors.ribbonWinding,
            category: {
                name: 'select',
                menu: ["No Problem", "Needs Adjustment", "Needs Repair/Replacement"]
            }
        },
        {
            label: "Ribbon Winding (Not Loose) Action",
            value: values.ribbonWindingAction,
            name: 'ribbonWindingAction',
            error: !!touched.ribbonWindingAction && !!errors.ribbonWindingAction,
            helperText: touched.ribbonWindingAction && errors.ribbonWindingAction,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: "Header Lock Lever (Not Loose)",
            value: values.headerLockLever,
            name: 'headerLockLever',
            error: !!touched.headerLockLever && !!errors.headerLockLever,
            helperText: touched.headerLockLever && errors.headerLockLever,
            category: {
                name: 'select',
                menu: ["No Problem", "Needs Adjustment", "Needs Repair/Replacement"]
            }
        },
        {
            label: "Header Lock Lever (Not Loose) Action",
            value: values.headerLockLeverAction,
            name: 'headerLockLeverAction',
            error: !!touched.headerLockLeverAction && !!errors.headerLockLeverAction,
            helperText: touched.headerLockLeverAction && errors.headerLockLeverAction,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: "Thermal Header (Clean)",
            value: values.thermalHeader,
            name: 'thermalHeader',
            error: !!touched.thermalHeader && !!errors.thermalHeader,
            helperText: touched.thermalHeader && errors.thermalHeader,
            category: {
                name: 'select',
                menu: ["No Problem", "Needs Adjustment", "Needs Repair/Replacement"]
            }
        },
        {
            label: "Thermal Header (Clean) Action",
            value: values.thermalHeaderAction,
            name: 'thermalHeaderAction',
            error: !!touched.thermalHeaderAction && !!errors.thermalHeaderAction,
            helperText: touched.thermalHeaderAction && errors.thermalHeaderAction,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: "Rollers (Clean)",
            value: values.rollerClean,
            name: 'rollerClean',
            error: !!touched.rollerClean && !!errors.rollerClean,
            helperText: touched.rollerClean && errors.rollerClean,
            category: {
                name: 'select',
                menu: ["No Problem", "Needs Adjustment", "Needs Repair/Replacement"]
            }
        },
        {
            label: "Rollers (Clean) Action",
            value: values.rollerCleanAction,
            name: 'rollerCleanAction',
            error: !!touched.rollerCleanAction && !!errors.rollerCleanAction,
            helperText: touched.rollerCleanAction && errors.rollerCleanAction,
            category: {
                name: 'textfield',
                menu: []
            }
        },
        {
            label: "Pitch (Align)",
            value: values.pitch,
            name: 'pitch',
            error: !!touched.pitch && !!errors.pitch,
            helperText: touched.pitch && errors.pitch,
            category: {
                name: 'select',
                menu: ["No Problem", "Needs Adjustment", "Needs Repair/Replacement"]
            }
        },
        {
            label: "Pitch (Align) Action",
            value: values.pitchAction,
            name: 'pitchAction',
            error: !!touched.pitchAction && !!errors.pitchAction,
            helperText: touched.pitchAction && errors.pitchAction,
            category: {
                name: 'textfield',
                menu: [""]
            }
        },
        {
            label: "Offset (Center Cut)",
            value: values.offset,
            name: 'offset',
            error: !!touched.offset && !!errors.offset,
            helperText: touched.offset && errors.offset,
            category: {
                name: 'select',
                menu: ["No Problem", "Needs Adjustment", "Needs Repair/Replacement"]
            }
        },
        {
            label: "Offset (Center Cut) Action",
            value: values.offsetAction,
            name: 'offsetAction',
            error: !!touched.offsetAction && !!errors.offsetAction,
            helperText: touched.offsetAction && errors.offsetAction,
            category: {
                name: 'textfield',
                menu: [""]
            }
        },
        {
            label: "Darkness (5)",
            value: values.darkness,
            name: 'darkness',
            error: !!touched.darkness && !!errors.darkness,
            helperText: touched.darkness && errors.darkness,
            category: {
                name: 'select',
                menu: ["No Problem", "Needs Adjustment", "Needs Repair/Replacement"]
            }
        },
        {
            label: "Darkness (5) Action",
            value: values.darknessAction,
            name: 'darknessAction',
            error: !!touched.darknessAction && !!errors.darknessAction,
            helperText: touched.darknessAction && errors.darknessAction,
            category: {
                name: 'textfield',
                menu: [""]
            }
        },
        {
            label: "Speed (3)",
            value: values.speed,
            name: 'speed',
            error: !!touched.speed && !!errors.speed,
            helperText: touched.speed && errors.speed,
            category: {
                name: 'select',
                menu: ["No Problem", "Needs Adjustment", "Needs Repair/Replacement"]
            }
        },
        {
            label: "Speed (3) Action",
            value: values.speedAction,
            name: 'speedAction',
            error: !!touched.speedAction && !!errors.speedAction,
            helperText: touched.speedAction && errors.speedAction,
            category: {
                name: 'textfield',
                menu: [""]
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