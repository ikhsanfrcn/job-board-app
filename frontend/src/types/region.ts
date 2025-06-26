export interface IProvince {
  id: string;
  name: string;
}

export interface ICity {
  id: string;
  province_id: string;
  name: string;
}
