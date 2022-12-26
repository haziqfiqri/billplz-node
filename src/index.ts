import axios, { AxiosInstance } from "axios";

export class BillPlz {
  private http: AxiosInstance;

  // TODO: refactor types on its own files lol

  constructor(
    public options: {
      key: string | undefined;
      sandbox: true;
    }
  ) {
    this.http = axios.create({
      baseURL: options.sandbox
        ? "https://www.billplz-sandbox.com/api"
        : "https://www.billplz.com/api",
      headers: {
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip,deflate,compress",
        Authorization:
          "Basic " + Buffer.from(options.key as string).toString("base64"),
      },
    });
  }

  async request<Type>(options: {
    url: string;
    method?: string;
    params?: {
      [key: string]: any; // TODO: refactor this lol haven't test this
    };
    body?: {
      [key: string]: any; // TODO: refactor this lol haven't test this
    };
  }): Promise<Type> {
    return this.http({
      url: options.url,
      method: options?.method,
      params: options?.params,
      data: options?.body,
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async createCollection(payload: {
    title: string;
    logo?: string;
    split_payment?: {
      email?: string;
      fixed_cut?: number;
      split_header?: boolean;
    };
  }): Promise<
    Array<{
      id: string;
      title: string;
      logo: {
        thumb_url: string | null;
        avatar_url: string | null;
      };
      split_payment: {
        email: string | null;
        fixed_cut: number | null;
        split_header: boolean;
      };
    }>
  > {
    return await this.request({
      url: "/v3/collections",
      method: "POST",
      body: payload,
    });
  }

  async getCollection(id: string): Promise<{
    id: string;
    title: string;
    logo: {
      thumb_url: string | null;
      avatar_url: string | null;
    };
    split_payment: {
      email: string | null;
      fixed_cut: number | null;
      variable_cut: number | null;
    };
    status: string;
  }> {
    return await this.request({
      url: `/v3/collections/${id}`,
      method: "GET",
    });
  }

  async getCollectionIndex(
    page?: string,
    status?: string
  ): Promise<{
    collections: Array<{
      id: string;
      title: string;
      logo: {
        thumb_url: string | null;
        avatar: string | null;
      };
      split_payment: {
        email: string | null;
        fixed_cut: number | null;
        split_header: boolean;
      };
      status: string;
    }>;
    page: number;
  }> {
    return await this.request({
      url: "/v3/collections",
      method: "GET",
      params: {
        page,
        status,
      },
    });
  }

  async createOpenCollection(payload: {
    title: string;
    description: string;
    amount: number;
    fixed_amount?: boolean;
    fixed_quantity?: boolean;
    reference_1_label?: string;
    reference_2_label?: string;
    email_link?: string;
    tax?: number;
    photo?: string;
    split_payment?: {
      email?: string;
      fixed_cut?: number;
      variable_cut?: number;
      split_header?: boolean;
    };
  }): Promise<{
    id: string;
    title: string;
    description: string;
    reference_1_label: string | null;
    reference_2_label: string | null;
    email_link: string | null;
    amount: number | null;
    fixed_amount: boolean;
    fixed_quantity: boolean;
    tax: number | null;
    payment_button: string;
    photo: {
      retina_url: string | null;
      avatar_url: string | null;
    };
    split_payment: {
      email: string | null;
      fixed_cut: number | null;
      variable_cut: number | null;
      split_header: boolean;
    };
    url: string;
  }> {
    return await this.request({
      url: "/open_collections",
      method: "POST",
      body: payload,
    });
  }

  async getOpenCollection(id: string): Promise<{
    id: string;
    title: string;
    description: string;
    reference_1_label: string | null;
    reference_2_label: string | null;
    email_link: string | null;
    amount: number | null;
    fixed_amount: boolean;
    fixed_quantity: boolean;
    tax: number | null;
    payment_button: string;
    photo: {
      retina_url: string | null;
      avatar_url: string | null;
    };
    split_payment: {
      email: string | null;
      fixed_cut: number | null;
      variable_cut: number | null;
      split_header: boolean;
    };
    url: string;
    status: string;
  }> {
    return await this.request({
      url: `/v3/open_collections/${id}`,
      method: "GET",
    });
  }

  async getOpenCollectionIndex(
    page?: string,
    status?: string
  ): Promise<{
    open_collections: Array<{
      id: string;
      title: string;
      description: string;
      reference_1_label: string | null;
      reference_2_label: string | null;
      email_link: string | null;
      amount: number | null;
      fixed_amount: boolean;
      fixed_quantity: boolean;
      tax: number | null;
      payment_button: string;
      photo: {
        retina_url: string | null;
        avatar_url: string | null;
      };
      split_payment: {
        email: string | null;
        fixed_cut: number | null;
        variable_cut: number | null;
        split_header: boolean;
      };
      url: string;
      status: string;
    }>;
    page: number;
  }> {
    return await this.request({
      url: "/v3/open_collections",
      method: "GET",
      params: {
        page,
        status,
      },
    });
  }

  async deactivateCollection(id: string): Promise<{}> {
    return await this.request({
      url: `/v3/collections/${id}/deactivate`,
      method: "POST",
    });
  }

  async activateCollection(id: string): Promise<{}> {
    return await this.request({
      url: `/v3/collections/${id}/activate`,
      method: "POST",
    });
  }

  async createBill(payload: {
    collection_id: string;
    email: string;
    mobile: string;
  }): Promise<{
    id: string;
    collection_id: string;
    paid: boolean;
    status: string;
    amount: number;
    paid_amout: number;
    due_at: string;
    mobile: string | null;
    name: string;
    url: string;
    reference_1_label: string;
    reference_1: string | null;
    reference_2_label: string;
    reference_2: string | null;
    redirect_url: string | null;
    callback_url: string;
    description: string;
  }> {
    return await this.request({
      url: "/v3/bills",
      method: "POST",
    });
  }
}
