import supabase from "./supabase";

export const getConsumers = async () => {
  const { data, error } = await supabase.from("consumers").select("*");
  if (error) {
    console.log(error);
    throw new Error("consumers : Error fetching data");
  }
  return data;
};

export const createEditConsumer = async (newConsumerData, id) => {
  // console.log(consumerdata, id);
  let query = supabase.from("consumers");

  // a) CREATE
  if (!id) query = query.insert([{ ...newConsumerData }]); //
  // b) EDIT
  if (id) query = query.update({ ...newConsumerData }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Error creating cabin");
  }
  return data;
};

export const deleteConsumers = async (id) => {
  const { error } = await supabase.from("consumers").delete().eq("id", id);

  if (error) {
    throw new Error("Error deleting consumer");
  }
};
