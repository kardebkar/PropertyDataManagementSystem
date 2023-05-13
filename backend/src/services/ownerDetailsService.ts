import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { assertIsDefined } from "../util/assertIsDefined";

import IOwnerDetailsMainModel, {
  IOwnerDetailsCreateModel,
  IOwnerDetailsUpdateParamsModel,
  IOwnerDetailsUpdateBodyModel,
} from "../models/ownerDetails";
import mongoose from "mongoose";

export const getAllOwnerDetails: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);
    const allOwnersDetails = await IOwnerDetailsMainModel.find().exec();

    res.status(200).json(allOwnersDetails);
  } catch (error) {
    next(error);
  }
};

export const getOneOwnerDetails: RequestHandler = async (req, res, next) => {
  const ownerId = req.params.ownerId;
  try {
    const ownerDetails = await IOwnerDetailsMainModel.findById(ownerId).exec();
    res.status(200).json(ownerDetails);
  } catch (error) {
    next(error);
  }
};

export const createOwnerDetails: RequestHandler<
  unknown,
  unknown,
  IOwnerDetailsCreateModel,
  unknown
> = async (req, res, next) => {
  const userId = req.body.userId;
  const ownerName = req.body.ownerName;
  const ownerMobileNo = req.body.ownerMobileNo;
  const ownerEmail = req.body.ownerEmail;
  const ownerWebsite = req.body.ownerWebsite;

  try {
    if (
      !userId ||
      !ownerName ||
      !ownerMobileNo ||
      !ownerEmail ||
      !ownerWebsite
    ) {
      throw createHttpError(400, "Parameters Missing!");
    }

    const existingOwnerName = await IOwnerDetailsMainModel.findOne({
      ownerName: ownerName,
    }).exec();

    if (existingOwnerName) {
      throw createHttpError(
        409,
        "Owner Name already taken. Please choose a different one."
      );
    }

    const existingEmail = await IOwnerDetailsMainModel.findOne({
      ownerEmail: ownerEmail,
    }).exec();

    if (existingEmail) {
      throw createHttpError(
        409,
        "An Owner with this email address already exists. Please choose a different one."
      );
    }

    const newOwner = await IOwnerDetailsMainModel.create({
      userId: userId,
      ownerName: ownerName,
      ownerMobileNo: ownerMobileNo,
      ownerEmail: ownerEmail,
      ownerWebsite: ownerWebsite,
    });

    res.status(201).json(newOwner);
  } catch (error) {
    next(error);
  }
};

export const updateOwnerDetails: RequestHandler<
  IOwnerDetailsUpdateParamsModel,
  unknown,
  IOwnerDetailsUpdateBodyModel,
  unknown
> = async (req, res, next) => {
  const paramsOwnerId = req.params.ownerId;

  const userId = req.body.userId;
  const ownerName = req.body.ownerName;
  const ownerMobileNo = req.body.ownerMobileNo;
  const ownerEmail = req.body.ownerEmail;
  const ownerWebsite = req.body.ownerWebsite;

  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);
    if (!mongoose.isValidObjectId(paramsOwnerId)) {
      throw createHttpError(400, "Invalid Owner ID!");
    }

    const updatedOwner = await IOwnerDetailsMainModel.findByIdAndUpdate(
      paramsOwnerId,
      {
        userId: userId,
        ownerName: ownerName,
        ownerMobileNo: ownerMobileNo,
        ownerEmail: ownerEmail,
        ownerWebsite: ownerWebsite,
      },
      { new: true }
    ).exec();

    res.status(200).json(updatedOwner);
  } catch (error) {
    next(error);
  }
};

export const deleteOwnerDetails: RequestHandler = async (req, res, next) => {
  const paramsOwnerId = req.params.ownerId;
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);
    if (!mongoose.isValidObjectId(paramsOwnerId)) {
      throw createHttpError(400, "Invalid Owner ID!");
    }

    const deletedOwner = await IOwnerDetailsMainModel.findByIdAndDelete(
      paramsOwnerId
    ).exec();
    res.status(200).json(deletedOwner);
  } catch (error) {
    next(error);
  }
};
