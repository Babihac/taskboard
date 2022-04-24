import React, { ReactElement } from "react";

import {
  assign,
  createMachine,
  MachineConfig,
  MachineOptions,
  StateNode,
} from "xstate";
import { MainInfo, Password, UserInfo } from "./steps";

export type Event = { type: "NEXT" } | { type: "PREV" };

const stepMap = {
  mainInfo: {
    currentStepNumber: 0,
    CurrentStep: MainInfo,
  },
  userInfo: {
    currentStepNumber: 1,
    CurrentStep: UserInfo,
  },
  password: {
    currentStepNumber: 2,
    CurrentStep: Password,
  },
};

const changeStep = assign<Context, Event>({
  step: (context, event, { action }) => {
    const step: "mainInfo" | "userInfo" | "password" = action.payload;
    return stepMap[step];
  },
});

type Context = {
  step: { currentStepNumber: number; CurrentStep: React.FC };
  lastStep: number;
};

type State = {
  states: {
    mainInfo: StateNode;
    userInfo: StateNode;
    password: StateNode;
  };
};

const machineConfig: MachineConfig<Context, State, Event> = {
  id: "formStepper",
  context: {
    step: stepMap["mainInfo"],
    lastStep: 2,
  },
  initial: "mainInfo",
  states: {
    mainInfo: {
      on: {
        NEXT: {
          target: "userInfo",
          actions: { type: "changeStep", payload: "userInfo" },
        },
      },
    },
    userInfo: {
      on: {
        PREV: {
          target: "mainInfo",
          actions: { type: "changeStep", payload: "mainInfo" },
        },
        NEXT: {
          target: "password",
          actions: { type: "changeStep", payload: "password" },
        },
      },
    },
    password: {
      on: {
        PREV: {
          target: "userInfo",
          actions: { type: "changeStep", payload: "userInfo" },
        },
      },
    },
  },
};

const machineOptions: MachineOptions<Context, Event> = {
  actions: { changeStep },
};

const formMachine = createMachine(machineConfig, machineOptions);
export default formMachine;
