/** @format */

import * as yup from "yup";

export const chargeboxValidation = yup.object({
  ocpp: yup.object({
    chargeboxId: yup.string().nullable().required("This field is required"),
    registrationStatus: yup
      .object()
      .shape({ value: yup.string().nullable(), label: yup.string().nullable() })
      .nullable()
      .required("This field is required"),
    endpointAddress: yup.string().nullable().required("This field is required"),
  }),
  address: yup.object({
    street: yup.string().nullable().required("This field is required"),
    houseNo: yup.string().nullable().required("This field is required"),
    zipcode: yup.string().nullable().required("This field is required"),
    country: yup
      .object()
      .shape({
        label: yup.string().nullable().required(),
        value: yup.string().nullable(),
      })
      .nullable()
      .required("This field is required"),
    state: yup
      .object()
      .shape({
        label: yup.string().nullable().required(),
        value: yup.string().nullable(),
      })
      .nullable()
      .required("This field is required"),
    city: yup
      .object()
      .shape({
        label: yup.string().nullable().required(),
        value: yup.string().nullable(),
      })
      .nullable()
      .required("This field is required"),
  }),
  misc: yup.object({
    desc: yup.string().nullable().required("This field is required"),
    adminAddress: yup.string().nullable().required("This field is required"),
    latitude: yup.number().nullable().required("This field is required"),
    longitude: yup.number().nullable().required("This field is required"),
    notes: yup.string().nullable().required("This field is required"),
  }),
});
export const companyValidation = yup.object({
  companyname: yup.string().nullable().required("This field is required"),
  description: yup.string().nullable().required("This field is required"),
  groupid_fk: yup.object().nullable().required("This field is required"),
  link: yup.string().nullable().required("This field is required"),
});

export const policyTagValidation = yup.object({
  tag_name: yup.string().nullable().required("This field is required"),
  // tag_user: yup.string().nullable().required('This field is required'),
  tag_multiplier: yup
    .number()
    .nullable()
    .min(0.1, "Tag Multiplier should be greater than zero")
    .max(99, "Enter maximum 99")
    .required("This field is required"),
});

export const pricingPolicyValidation = yup.object({
  profilename: yup.string().nullable().required("This field is required"),
  applicabletype: yup.object().nullable().required("This field is required"),
  profileday: yup.object().nullable().required("This field is required"),
  profilepriority: yup
    .number()
    .min(1, "Profile priority should be greater than 0")
    .nullable()
    .required("This field is required"),

  limitminutes: yup
    .number()
    .min(1, "limit minutes should be greater than 0")
    .nullable()
    .required("This field is required"),

  rates: yup
    .array()
    .min(1)
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
    )
    .nullable()
    .required("This field is required"),
});
export const tarifGroupValidation = yup.object({
  groupname: yup.string().nullable().required("This field is required"),
  pricingpolicy: yup
    .array()
    .min(1)
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
    )
    .nullable()
    .required("This field is required"),
  chargebox: yup
    .array()
    .min(1)
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
    )
    .nullable()
    .required("This field is required"),
});
export const userGroupValidation = yup.object({
  groupname: yup.string().nullable().required("This field is required"),
  description: yup.string().nullable().required("This field is required"),
});
export const updateChargeBoxModelValid = yup.object({
  chargebox_tag: yup
    .array()
    .min(1)
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
    )

    .nullable(),
  // .required('This field is required')
});
export const updateCustomerModelValid = yup.object({
  user_tag: yup
    .array()
    .min(1)
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
    )

    .nullable(),
  // .required('This field is required')
});

export const updateGroupValidation = yup.object({
  user: yup.array().nullable(),
  // .required('This field is required'),
  policy: yup.array().nullable(),
  // .required('This field is required')
});
export const modal = yup.object({
  connectorTypeName: yup.string().nullable().required("This field is required"),
  connectorCategory: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .nullable()
    .required("This field is required"),
});

export const rateVAlidationSchema = yup.object({
  profilepricetype: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .nullable()
    .required("This field is required"),
  profilepriceunit: yup
    .number()
    .moreThan(0, "Price should be greater than 0")
    .nullable()
    .required("This field is required"),
  // .integer('Value Should be integer')
});
export const reportsValidation = yup.object({
  // chargeboxid: yup.string().nullable().required('This field is required'),
  chargeboxid: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .nullable()
    .required("This field is required"),
  type: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .nullable()
    .required("This field is required"),
});
