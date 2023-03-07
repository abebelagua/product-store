import { AuthModule } from './auth';
import { ProductModule } from './product';
import { StoreModule } from './store';
import { UserModule } from './user';

export const features = [AuthModule, UserModule, ProductModule, StoreModule];
