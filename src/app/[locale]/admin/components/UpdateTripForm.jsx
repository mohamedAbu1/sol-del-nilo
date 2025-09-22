import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DOMAIN } from "@/lib/constants/FixedTexts";
import { ToastContainer, toast } from "react-toastify";
import { grey } from "@mui/material/colors";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

const UpdateTripForm = () => {
  const router = useRouter();
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  // 🧾 بيانات النموذج الأساسية
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    information: "",
  });
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  // 📆 عدد الأيام و الأشخاص
  const [days, setDays] = useState("");
  const [people, setPeople] = useState("");
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  // 🏙️ المدينة و التصنيف
  const [cityId, setCityId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitleId] = useState("");
  const [toursID, setToursID] = useState("");
  const [loading, setLoading] = useState(true);

  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  // 📦 تحميل المدن والتصنيفات من قاعدة البيانات
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [toursData, setToursData] = useState([]);
  const [tour, setTour] = useState(null);

  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cityRes, categoryRes] = await Promise.all([
          axios.get(`${DOMAIN}/api/city`),
          axios.get(`${DOMAIN}/api/categories`),
        ]);
        setCities(cityRes.data);
        setCategories(categoryRes.data);
      } catch (error) {
        toast.error("❌ خطأ في تحميل المدن أو التصنيفات:", error);
      }
    };
    fetchData();
  }, []);
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  // 🖼️ الصور المختارة
  const [selectedImages, setSelectedImages] = useState([]);
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  // 📤 تحميل الصور من الجهاز
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = 12 - selectedImages.length;

    if (
      selectedImages.length + files.length > 12 ||
      selectedImages.length + files.length < 4
    ) {
      toast.error("❌ يجب اختيار ما بين 4 إلى 12 صورة.");
      return;
    }

    const limitedFiles = files.slice(0, remainingSlots);
    console.log(limitedFiles);
    const newImages = limitedFiles.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      file,
    }));
    console.log(newImages);

    setSelectedImages((prev) => [...prev, ...newImages]);
  };
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  // 🧹 تنظيف روابط الصور المؤقتة عند الخروج
  useEffect(() => {
    return () => {
      selectedImages.forEach((img) => {
        if (img.url) URL.revokeObjectURL(img.url);
      });
    };
  }, [selectedImages]);
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  // ✏️ تحديث الحقول النصية
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value > 5000) {
      toast.error("❌ لا يمكن أن يكون السعر أكبر من 5000 دولار", {
        position: "top-center",
      });
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  // 📩 إرسال النموذج إلى API
  const handleSubmit = async (e) => {
    e.preventDefault();
    // ✅ تحقق من عدد الصور قبل الإرسال
    if (selectedImages.length < 4 || selectedImages.length > 12) {
      toast.error("❌ يجب اختيار ما بين 4 إلى 12 صورة قبل حفظ الرحلة");
      return;
    }
    const DayPeople = `${days}Day/${people}People`;

    try {
      console.log({
        ...formData,
        DayPeople: `${days}Day/${people}People`,
        categoryId,
        cityId,
        image: selectedImages.map((img) => img.name),
      });

      const response = await axios.patch(`${DOMAIN}/api/tours/${toursID}`, {
        ...formData,
        price: parseFloat(formData.price),
        DayPeople,
        categoryId,
        cityId,
        image: selectedImages.map((img) => img.name),
        currentUserRole: "ADMIN",
      });

      if (response) {
        toast.success("✅ تم حفظ الرحلة:", response.data);
        // 🔄 إعادة تعيين النموذج
        setFormData({ title: "", description: "", price: "", information: "" });
        setDays("");
        setPeople("");
        setCityId("");
        setCategoryId("");
        setTitleId("");
        setSelectedImages([]);
      } else {
        toast.error("❌ فشل في حفظ الرحلة:", response.data);
      }
    } catch (error) {
      toast.error("❌ خطأ في الاتصال بـ API:", error);
    }
  };
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${DOMAIN}/api/tours`);
        console.log(response.data.tours);
        setToursData(response.data.tours);
      } catch (error) {
        return null;
      }
    };
    fetchUser();
    console.log(toursData);
  }, []);
  const handleSelect = (e) => {
    const selectedId = e.target.value;
    setTitleId(selectedId);
    setToursID(selectedId); // ✅ هنا فقط يتم التحديث
  };
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await axios.get(`/api/tours/${toursID}`);
        console.log(response.data.tour);
        setTour(response.data.tour);
      } catch (error) {
        console.error("❌ فشل في جلب بيانات الرحلة:", error.message);
      } finally {
        setLoading(false);
      }
    };
    if (toursID) fetchTour();
  }, [toursID]);
  useEffect(() => {
    console.log(tour);
    if (tour) {
      setFormData({
        title: tour.title || "",
        description: tour.description || "",
        price: tour.price?.toString() || "",
        information: tour.information || "",
      });

      // لو أردت تعبئة Days و People أيضًا:
      const [dayPart, peoplePart] = tour.DayPeople?.split("/") || [];
      setDays(dayPart?.replace("Day", "") || "");
      setPeople(peoplePart?.replace("People", "") || "");

      // لو أردت تعبئة التصنيف والمدينة:
      setCategoryId(tour.categoryId || "");
      setCityId(tour.cityId || "ةخ");

      // ✅ تعبئة الصور
      const loadedImages =
        tour.image?.map((imgName) => ({
          name: imgName,
          url: `${DOMAIN}/assets/${imgName}`, // تأكد من المسار الصحيح للصور
          file: null, // الصور المحملة من السيرفر لا تحتوي على ملف فعلي
        })) || [];
      console.log(loadedImages);
      setSelectedImages(loadedImages);
    }
  }, [tour]);
  return (
    <>
      <div
        className="w-full flex flex-col items-center justify-center"
        style={{overflowY:"scroll", margin: "20px 0", padding: "20px" }}
      >
        <h1
          style={{ fontWeight: "700", color: "#FFF", marginBottom: "20px" }}
          className="text-4xl capitalize"
        >
          Updates <span style={{ color: "#ff9800" }}>a Trip</span>
        </h1>
        {/* 🏙️ اختيار المدينة */}
        <FormControl
          required
          sx={{
            width: "70%",
            input: {
              color: "#d4a85f",
              fontSize: "18px",
              fontWeight: "bold",
              fontFamily: "Cairo, sans-serif",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#d4a85f" },
              "&:hover fieldset": { borderColor: "#ff9800" },
              "&.Mui-focused fieldset": {
                borderColor: "#ff9800",
                borderWidth: "2px",
              },
            },
            "& .MuiInputLabel-root": { color: "#d4a85f" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#ff9800" },
          }}
        >
          <InputLabel id="city-select-label">
            اختر عنوان الرحله التي تريد تحديثها
          </InputLabel>
          <Select
            labelId="city-select-label"
            id="city-select"
            value={title}
            onChange={handleSelect}
            sx={{ color: "#d4a85f" }}
          >
            {toursData.map((i) => (
              <MenuItem key={i.id} value={i.id}>
                {i.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box
          sx={{
            width: "70%",
            mx: "auto",
            mt: 5,
            p: 3,
            boxShadow: 3,
            borderRadius: 4,
            border: "1px solid grey",
            color: "#FFF",
          }}
        >
          <Typography variant="h5" gutterBottom>
            تحديث بيانات رحله
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              {/* 📝 عنوان الرحلة */}
              <TextField
                label="عنوان الرحلة"
                name="title"
                value={formData.title}
                onChange={handleChange}
                sx={{
                  input: {
                    color: "#d4a85f",
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "Cairo, sans-serif",
                  },

                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#d4a85f" },
                    "&:hover fieldset": { borderColor: "#ff9800" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff9800",
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#d4a85f" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#ff9800" },
                }}
                fullWidth
                required
              />

              {/* 📝 وصف الرحلة */}
              <TextField
                label="معلومات عن المعبد او المكان السياحي"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#d4a85f", // ✅ لون النص داخل الحقل
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "Cairo, sans-serif",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#d4a85f" },
                    "&:hover fieldset": { borderColor: "#ff9800" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff9800",
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#d4a85f" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#ff9800" },
                }}
                fullWidth
                required
              />

              {/* 🖼️ تحميل الصور */}
              <Box>
                <input
                  accept="image/*"
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  id="upload-multiple-images"
                />
                <label htmlFor="upload-multiple-images">
                  <Button
                    variant="contained"
                    component="span"
                    sx={{
                      backgroundColor: "#ff9800",
                      color: "#ffffff",
                      fontSize: "18px",
                      fontWeight: "700",
                    }}
                  >
                    اختر صور من جهازك
                  </Button>
                </label>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
                  {selectedImages.map((img, index) => (
                    <Box
                      key={index}
                      position="relative"
                      sx={{ width: "150px" }}
                    >
                      <Button
                        size="small"
                        onClick={() => {
                          setSelectedImages((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                          URL.revokeObjectURL(img.url);
                        }}
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          minWidth: "30px",
                          padding: "2px",
                          color: "#ff9800",
                          borderRadius: "50%",
                          zIndex: 1,
                        }}
                      >
                        <AiOutlineClose style={{ fontSize: "22px" }} />
                      </Button>
                      <img
                        src={img.url}
                        alt={img.name}
                        style={{ width: "100%", borderRadius: "8px" }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* 💰 السعر */}
              <TextField
                label="ثمن الرحله بالدولار"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ color: "#d4a85f" }}>
                      $
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  max: 1000, // ✅ يمنع إدخال أكثر من 1000 من خلال واجهة المستخدم
                  min: 0, // اختياري: لمنع القيم السالبة
                }}
                sx={{
                  width: "18%",
                  input: {
                    color: "#d4a85f",
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "Cairo, sans-serif",
                  },
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                  "& input": {
                    MozAppearance: "textfield",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#d4a85f" },
                    "&:hover fieldset": { borderColor: "#ff9800" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff9800",
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#d4a85f" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#ff9800" },
                }}
              />

              {/* ℹ️ معلومات إضافية */}
              <TextField
                label="معلومات عن الرحله"
                name="information"
                value={formData.information}
                onChange={handleChange}
                multiline
                rows={2}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#d4a85f", // ✅ لون النص داخل الحقل
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "Cairo, sans-serif",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#d4a85f" },
                    "&:hover fieldset": { borderColor: "#ff9800" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff9800",
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#d4a85f" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#ff9800" },
                }}
                fullWidth
              />

              <div className="flex flex-row gap-8">
                {/* 📆 عدد الأيام */}
                <TextField
                  label="عدد الأيام"
                  type="number"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  sx={{
                    width: "48%",

                    input: {
                      color: "#d4a85f",
                      fontSize: "18px",
                      fontWeight: "bold",
                      fontFamily: "Cairo, sans-serif",
                    },
                    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                      {
                        WebkitAppearance: "none",
                        margin: 0,
                      },
                    "& input": {
                      MozAppearance: "textfield",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#d4a85f" },
                      "&:hover fieldset": { borderColor: "#ff9800" },
                      "&.Mui-focused fieldset": {
                        borderColor: "#ff9800",
                        borderWidth: "2px",
                      },
                    },
                    "& .MuiInputLabel-root": { color: "#d4a85f" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#ff9800" },
                  }}
                  fullWidth
                  required
                />

                {/* 👥 عدد الأشخاص */}
                <TextField
                  label="عدد الأشخاص"
                  type="number"
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  sx={{
                    width: "48%",
                    input: {
                      color: "#d4a85f",
                      fontSize: "18px",
                      fontWeight: "bold",
                      fontFamily: "Cairo, sans-serif",
                    },
                    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                      {
                        WebkitAppearance: "none",
                        margin: 0,
                      },
                    "& input": {
                      MozAppearance: "textfield",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#d4a85f" },
                      "&:hover fieldset": { borderColor: "#ff9800" },
                      "&.Mui-focused fieldset": {
                        borderColor: "#ff9800",
                        borderWidth: "2px",
                      },
                    },
                    "& .MuiInputLabel-root": { color: "#d4a85f" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#ff9800" },
                  }}
                  fullWidth
                  required
                />
              </div>

              {/* 🏷️ اختيار التصنيف */}
              <FormControl
                fullWidth
                required
                sx={{
                  input: {
                    color: "#d4a85f",
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "Cairo, sans-serif",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#d4a85f" },
                    "&:hover fieldset": { borderColor: "#ff9800" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff9800",
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#d4a85f" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#ff9800" },
                }}
              >
                <InputLabel id="category-select-label">اختر التصنيف</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  value={categoryId}
                  sx={{color:"#d4a85f"}}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* 🏙️ اختيار المدينة */}
              <FormControl
                fullWidth
                required
                sx={{
                  input: {
                    color: "#d4a85f",
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "Cairo, sans-serif",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#d4a85f" },
                    "&:hover fieldset": { borderColor: "#ff9800" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff9800",
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#d4a85f" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#ff9800" },
                }}
              >
                <InputLabel id="city-select-label">اختر المدينة</InputLabel>
                <Select
                  labelId="city-select-label"
                  id="city-select"
                  value={cityId}
                  sx={{color:"#d4a85f"}}
                  onChange={(e) => setCityId(e.target.value)}
                >
                  {cities.map((city) => (
                    <MenuItem key={city.id} value={city.id}>
                      {city.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* ✅ زر الحفظ */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#ff9800",
                  color: "#ffffff",
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                تعديل بيانات الرحله
              </Button>
            </Stack>
          </form>
        </Box>
      </div>
      <ToastContainer />
    </>
  );
};

export default UpdateTripForm;
