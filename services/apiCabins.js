import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins cannot be loaded.");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted.");
  }
  return data;
}

/* Id for the purpose of knowing if nasa edit session ba */
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  /* needs ng unique number sa unahan and also nireplace or tinanggal yung slashes para maiwasan yung pag create ng folder sa supabase */
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  /* 2 scenarios if meron nang supabase url pwedeng yon na gamitin. If wala ba yung bagong imagepath yung gagamitin. */
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  /* All the path are used sa pag create ng new cabin para included na yung image sa pag upload */

  //Step 1. Create/Edit a cabin

  let query = supabase.from("cabins");

  //A. Create session
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B. Edit session
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  /* it will work kasi yung form na meron tayo sakto na don sa needed na object elements. */

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be added.");
  }

  if (hasImagePath) return data;
  //Step 2. Upload the image to the bucket
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //Step 3. Delete the cabin if there's an error in uploading
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "There's a problem in uploading the image and the cabin was not created."
    );
  }
  return data;
}
