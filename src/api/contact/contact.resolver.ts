import { Args, Field, InputType, Mutation, Resolver } from '@nestjs/graphql';
import { ResendService } from '../../shared/resend/resend.service';
import { ConfigService } from '../../shared/config/config.service';

@InputType()
export class ContactInput {
  @Field() name: string;
  @Field() email: string;
  @Field() message: string;
}

@Resolver()
export class ContactResolver {
  constructor(
    private readonly resendService: ResendService,
    private readonly configService: ConfigService,
  ) {}

  @Mutation(() => Boolean)
  async sendContactMessage(@Args('data') data: ContactInput): Promise<boolean> {
    const to = this.configService.get('CONTACT_EMAIL') as string;
    await this.resendService.sendContactMessage(to, data.name, data.email, data.message);
    return true;
  }
}
