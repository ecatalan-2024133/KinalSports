import { Schema, model } from "mongoose";

const fieldSchema = new Schema(
  {
    fieldName: {
      type: String,
      required: [true, "El nombre de la cancha es obligatorio"],
      trim: true,
      max: [100, "El nombre no puede exceder los 100 caracteres"],
    },
    fieldType: {
      type: String,
      required: [true, "El tipo de superficie es obligatorio"],
      enum: {
        values: ["NATURAL", "SINTETICA", "CONCRETO"],
        message: "El tipo de superficie no es válido",
      },
    },
    capacity: {
      type: String,
      required: [true, "La capacidad de la cancha es obligatoria"],
      enum: {
        values: ["FUTBOL_5", "FUTBOL_7", "FUTBOL_11"],
        message: "La capacidad no es válida",
      },
    },
    pricePerHour: {
      type: Number,
      required: [true, "El precio por hora es obligatorio"],
      min: [0, "el precio debe ser mayor o igual a 0"],
    },
    description: {
      type: String,
      trim: true,
      maxLength: [500, "La descripción no puede exceder 500 caracteres"],
    },
    photo: {
      type: String,
      default: "fields/kinal_sports_hg091f",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Índices para optimizar búsquedas
fieldSchema.index({ isActive: 1 });
fieldSchema.index({ fieldType: 1 });
fieldSchema.index({ isActive: 1, fieldType: 1 });

export default model("Field", fieldSchema);
