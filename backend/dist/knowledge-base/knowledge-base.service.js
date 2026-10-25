var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { MAT_PORC_SNIPPETS } from './data/mat-porc.snippets.js';
import { LC_INF_SNIPPETS } from './data/lc-inf.snippets.js';
import { SOC_CIUD_SNIPPETS } from './data/soc-ciud.snippets.js';
import { CN_SNIPPETS } from './data/cn.snippets.js';
import { ING_SNIPPETS } from './data/ing.snippets.js';
const SNIPPETS_BY_SKILL_CODE = {
    'MAT-PORC': MAT_PORC_SNIPPETS,
    'LC-INF': LC_INF_SNIPPETS,
    'SOC-CIUD': SOC_CIUD_SNIPPETS,
    CN: CN_SNIPPETS,
    ING: ING_SNIPPETS,
};
let KnowledgeBaseService = class KnowledgeBaseService {
    retrieve(skillCode, limit = 2) {
        const snippets = SNIPPETS_BY_SKILL_CODE[skillCode] ?? [];
        return snippets.slice(0, limit);
    }
    getHint(skillCode, hintNumber) {
        const snippets = SNIPPETS_BY_SKILL_CODE[skillCode] ?? [];
        return snippets[hintNumber - 1] ?? null;
    }
};
KnowledgeBaseService = __decorate([
    Injectable()
], KnowledgeBaseService);
export { KnowledgeBaseService };
//# sourceMappingURL=knowledge-base.service.js.map