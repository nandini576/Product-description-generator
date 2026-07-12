import { body } from "express-validator";

export const registerValidation = [

    body("name")

        .trim()

        .notEmpty()

        .withMessage("Name is required"),

    body("email")

        .isEmail()

        .withMessage("Enter valid email"),

    body("password")

        .isLength({

            min:6

        })

        .withMessage("Password must contain 6 characters")

];



export const loginValidation = [

    body("email")

        .isEmail()

        .withMessage("Enter valid email"),

    body("password")

        .notEmpty()

        .withMessage("Password required")

];