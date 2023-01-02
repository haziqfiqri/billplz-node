export type SplitPayment = {
  email: string;
  fixed_cut: number;
  split_header: boolean;
};

export type Logo = {
  thumb_url: string;
  avatar_url: string;
};

export type Collection = {
  title: string;
  // logo: string;
  split_payment: SplitPayment;
};

export type OpenCollection = {
  description: string;
  amount: number;
  fixed_amount: boolean;
  fixed_quantity: boolean;
  reference_1_label: string;
  reference_2_label: string;
  email_link: string;
  tax: number;
};

export type CreateCollectionRequest = Required<Pick<Collection, "title">> &
  Partial<
    Collection & {
      logo: string;
    }
  >;

export type CreateCollectionResponse = Required<
  Array<
    Collection & {
      logo: Logo;
    }
  >
>;

export type GetCollectionResponse = Required<
  Collection & {
    id: string;
    status: string;
    logo: Logo;
  }
>;

export type GetCollectionIndexResponse = Required<{
  collections: Array<GetCollectionResponse>;
  page: number;
}>;

export type CreateOpenCollectionRequest = Required<
  Pick<OpenCollection & Collection, "title" | "description" | "amount">
> &
  Partial<
    OpenCollection &
      Collection & {
        photo: string;
      }
  >;

export type CreateOpenCollectionResponse = Required<
  OpenCollection &
    Collection & {
      payment_button: string;
      id: string;
      url: string;
      photo: {
        retina_url: string;
        avatar_url: string;
      };
      split_payment: SplitPayment & {
        variable_cut: number;
      };
    }
>;
