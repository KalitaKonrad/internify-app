import { Company } from './Company';
import { Owner } from './Owner';

export interface Job {
  id: number;
  title: string;
  description: string;
  published: string;
  slug: string;
  updated_at: string;
}

export interface CompanyWithOwner extends Company {
  owner: Owner;
}

export interface JobWithCompanyAndOwner extends Job {
  company: CompanyWithOwner;
}
