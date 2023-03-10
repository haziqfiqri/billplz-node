import axios, { AxiosInstance } from "axios";
import {
  CreateCollectionRequest,
  CreateCollectionResponse,
  CreateOpenCollectionRequest,
  CreateOpenCollectionResponse,
  GetCollectionIndexResponse,
  GetCollectionResponse,
} from "./types/collection";

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

  async createCollection(
    payload: // {
    //   title: string;
    //   logo?: string;
    //   split_payment?: {
    //     email?: string;
    //     fixed_cut?: number;
    //     split_header?: boolean;
    //   };
    // }
    CreateCollectionRequest
  ): Promise<// Array<{
  //   id: string;
  //   title: string;
  //   logo: {
  //     thumb_url: string | null;
  //     avatar_url: string | null;
  //   };
  //   split_payment: {
  //     email: string | null;
  //     fixed_cut: number | null;
  //     split_header: boolean;
  //   };
  // }>
  CreateCollectionResponse> {
    return await this.request({
      url: "/v3/collections",
      method: "POST",
      body: payload,
    });
  }

  async getCollection(id: string): Promise<// {
  //   id: string;
  //   title: string;
  //   logo: {
  //     thumb_url: string | null;
  //     avatar_url: string | null;
  //   };
  //   split_payment: {
  //     email: string | null;
  //     fixed_cut: number | null;
  //     variable_cut: number | null;
  //   };
  //   status: string;
  // }
  GetCollectionResponse> {
    return await this.request({
      url: `/v3/collections/${id}`,
      method: "GET",
    });
  }

  async getCollectionIndex(
    page?: string,
    status?: string
  ): Promise<// {
  //   collections: Array<{
  //     id: string;
  //     title: string;
  //     logo: {
  //       thumb_url: string | null;
  //       avatar: string | null;
  //     };
  //     split_payment: {
  //       email: string | null;
  //       fixed_cut: number | null;
  //       split_header: boolean;
  //     };
  //     status: string;
  //   }>;
  //   page: number;
  // }
  GetCollectionIndexResponse> {
    return await this.request({
      url: "/v3/collections",
      method: "GET",
      params: {
        page,
        status,
      },
    });
  }

  async createOpenCollection(
    payload: //   {
    //   title: string;
    //   description: string;
    //   amount: number;
    //   fixed_amount?: boolean;
    //   fixed_quantity?: boolean;
    //   reference_1_label?: string;
    //   reference_2_label?: string;
    //   email_link?: string;
    //   tax?: number;
    //   photo?: string;
    //   split_payment?: {
    //     email?: string;
    //     fixed_cut?: number;
    //     variable_cut?: number;
    //     split_header?: boolean;
    //   };
    // }
    CreateOpenCollectionRequest
  ): Promise<// {
  //   id: string;
  //   title: string;
  //   description: string;
  //   reference_1_label: string | null;
  //   reference_2_label: string | null;
  //   email_link: string | null;
  //   amount: number | null;
  //   fixed_amount: boolean;
  //   fixed_quantity: boolean;
  //   tax: number | null;
  //   payment_button: string;
  //   photo: {
  //     retina_url: string | null;
  //     avatar_url: string | null;
  //   };
  //   split_payment: {
  //     email: string | null;
  //     fixed_cut: number | null;
  //     variable_cut: number | null;
  //     split_header: boolean;
  //   };
  //   url: string;
  // }
  CreateOpenCollectionResponse> {
    return await this.request({
      url: "/v3/open_collections",
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
    name: string;
    amount: number;
    callback_url: string;
    description: string;
    due_at?: string; // TODO: formatter YYYY-MM-DD
    redirect_url?: string;
    deliver?: boolean;
    reference_1_label?: string;
    reference_1?: string;
    reference_2_label?: string;
    reference_2?: string;
  }): Promise<{
    id: string;
    collection_id: string;
    paid: boolean;
    state: string;
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
      body: payload,
    });
  }

  async getBill(id: string): Promise<{
    id: string;
    collection_id: string;
    paid: boolean;
    state: string;
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
      url: `/v3/bills/${id}`,
      method: "GET",
    });
  }

  async deleteBill(id: string): Promise<{}> {
    return await this.request({
      url: `/v3/bills/${id}`,
      method: "DELETE",
    });
  }

  async registrationCheckByBankAccountNumber(id: string): Promise<{
    name: string;
  }> {
    return await this.request({
      url: `/v3/check/bank_account_number/${id}`,
      method: "GET",
    });
  }

  async getTransactionIndex(
    id: string,
    page?: string,
    status?: string
  ): Promise<{
    bill_id: string;
    transaction: Array<{
      id: string;
      status: string; // TODO: refactor enums "pending", "completed", "failed"
      completed_at: string;
      payment_channel: string; // TODO: refactor enums "AMEXMBB" "BANKISLAM" "BOOST" "TOUCHNGO" "EBPGMBB" "FPX" "FPXB2B1" "MPGS" "OCBC" "PAYDEE" "RAZERPAYWALLET" "SECUREACCEPTANCE" "SENANGPAY" "TWOCTWOP" "TWOCTWOPIPP" "TWOCTWOPWALLET"
    }>;
  }> {
    return await this.request({
      url: `/v3/bills/${id}/transactions`,
      method: "GET",
      params: {
        page,
        status,
      },
    });
  }

  // TODO: add v4 endpointss
}

const BillPlzInstance = new BillPlz({
  key: "4c0157d7-00cc-46dd-bab9-afef6f573f7c",
  sandbox: true,
});

// const getCollection = await BillPlzInstance.getCollection("vnzd6hpm");
// console.log(getCollection);

const createCollection = await BillPlzInstance.createCollection({
  title: "Test Collection",
});
console.log(createCollection);
