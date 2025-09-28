import supabase from "./supabase";

export const getStuffs = async () => {
  const { data, error } = await supabase.from("staff").select("*");

  if (error) {
    console.error(error);
    throw new Error("stuff : Error fetching data");
  }
  return data;
};
