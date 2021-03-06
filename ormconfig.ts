
import { ConfigModule } from '@nestjs/config';
import dbConfiguration from '@core/database/database.config';

ConfigModule.forRoot({
  isGlobal: true,
  load: [dbConfiguration]
});

export default dbConfiguration();
