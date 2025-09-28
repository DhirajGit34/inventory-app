import supabase from "./supabase";

export const getStocks = async () => {
  const { data, error } = await supabase.from("stocks").select("*");
  if (error) {
    console.error(error);
    throw new Error("stocks : Error fetching data");
  }
  return data;
};
