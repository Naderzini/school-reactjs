import {PARENT_CONVERSATION} from '../types'

export function parentConversation(parent) {
    return {
      type: PARENT_CONVERSATION ,
      payload: parent,
    };
  }