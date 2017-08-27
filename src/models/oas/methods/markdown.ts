import {IParameterExtended} from '../interfaces/IParameterExtended';
import {ISpecExtended} from '../interfaces/ISpecExtended';

import {trim, summary, text} from '../../../services/md-converter';

export function mdInfo(spec: ISpecExtended) {
  if (spec.info.description) {
    (spec.info as any)._md_description = trim(spec.info.description);
  }
}

export function mdTags(spec: ISpecExtended, max: number) {
  let n = 0;

  for (const tag of spec.tags) {
    tag._md_description = tag._md_description || trim(tag.description);

    if (n++ === max) {
      return
    }
  }
}

export function mdOperations(spec: ISpecExtended, max: number) {
  let n = 0;

  for (const op of spec._operations) {
    if (op.description) {
      op._md_description = op._md_description || trim(op.description);
    }

    if (!op.summary && op.description) {
      op.summary = op.summary || summary(text(op._md_description))
    }

    if (op.summary) {
      op._md_summary = op._md_summary || trim(op.summary);
    }

    if (op._md_summary === op._md_description) {
      delete op._md_description;
      delete op.description;
    }

    if (n++ === max) {
      return
    }
  }
}

export function mdParameters(spec: ISpecExtended, max: number) {
  let n = 0;

  for (const op of spec._operations) {
    if (op.parameters) {
      for (const param of (op.parameters as any as IParameterExtended[])) {
        if ((param as any).description) {
          (param as any)._md_description = (param as any)._md_description || trim((param as any).description);
        }
      }
    }

    if (n++ === max) {
      return
    }
  }
}

export function mdResponses(spec: ISpecExtended, max: number) {
  let n = 0;

  for (const op of spec._operations) {
    if (op.responses) {
      for (const respName in op.responses) {
        if (op.responses[respName].description) {
          (op.responses[respName] as any)._md_description = (op.responses[respName] as any)._md_description || trim(op.responses[respName].description);
        }
      }
    }

    if (n++ === max) {
      return
    }
  }
}