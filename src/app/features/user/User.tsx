import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Box,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  FormHelperText,
  Button,
} from "@mui/material";

import { BASE_URL, defaultImageUrl } from "../../core/const/default-links";
import { useState } from "react";
import type { User } from "../../core/models/user";
import axios from "axios";
import Loading from "../../shared/loading/Loading";
import { ApiUrlEnum } from "../../core/const/api.enums";

export default function User() {
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    reset,
    setValue,
    formState: { errors },
  } = useForm<User>();

  const [isDisabled, setIsdisabled] = useState<boolean>(false);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    defaultImageUrl
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const fileList = event.target.files;

    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64Image = e.target?.result as string;
        setValue("image", base64Image);
        setAvatarPreview(base64Image);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSelectChange = (event: any): void => {
    const value = event.target.value;
    if (value === "") {
      setError("gender", {
        type: "manual",
        message: "Gender is required",
      });
    } else {
      clearErrors("gender");
    }
  };

  const fetchData = async (data: User) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/${ApiUrlEnum.USERS}`,
        data
      );

      if (response.data) {
        alert("Data submitted successfully");
        reset();
        setAvatarPreview(defaultImageUrl);
      }
    } catch (error) {
      console.error("there was an error!", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisableToggle = (e: React.MouseEvent): void => {
    e.preventDefault(); // preventDefault არ არის საჭირო მაგრამ რერენდერის შემდეგ დაკლიკვისას იწვევს საბმითს მიუხედავად იმისა რომ ტიპი არის button... ??
    setIsdisabled((current) => !current);
  };

  const handleFileDelete = (): void => {
    setAvatarPreview(defaultImageUrl);
  };

  const validateAlphabet = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value;
    const isGeorgian = /^[ა-ჰ]+$/.test(value[0]);
    if (isGeorgian) {
      e.currentTarget.value = value.replace(/[^ა-ჰ]/g, "");
    } else {
      e.currentTarget.value = value.replace(/[^A-Za-z]/g, "");
    }
  };
  
  const allowOnlyNumbers = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
  };

  const onSubmit: SubmitHandler<User> = async (data: User) => {
    await fetchData(data);
  };

  if (isLoading) return <Loading />;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex form"
      noValidate
    >
      <Box className="w-[18%] left">
        <Box className="flex flex-wrap justify-center items-center gap-5">
          <img
            src={avatarPreview}
            className="w-[200px] h-[200px] rounded-full object-cover"
            alt="Avatar"
          />
          {!isDisabled && (
            <>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                className="!bg-[#04a2e1] relative"
              >
                Upload Image
                <input
                  className="!overflow-hidden absolute left-0 bottom-0 custom-clip-path"
                  style={{ clipPath: "inset(50%)" }}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              {avatarPreview !== defaultImageUrl && (
                <Button
                  type="button"
                  variant="contained"
                  onClick={handleFileDelete}
                  className="!bg-[#f44336]"
                >
                  Delete image
                </Button>
              )}
            </>
          )}
        </Box>
      </Box>
      <Box className="w-[82%] pl-[40px] right">
        <Box className="w-[800px]">
          <h2 className="text-[#04a2e1] text-[50px] font-medium font-kanit title">
            User Information
          </h2>
          <Box className="pt-[30px]">
            <Box className="flex flex-wrap gap-[20px] input-container">
              <FormControl className="w-[385px] form-control">
                <TextField
                  {...register("firstName", {
                    required: "First Name is required",
                    minLength: {
                      value: 2,
                      message: "Value of input should be min two character",
                    },
                  })}
                  disabled={isDisabled}
                  label="First Name*"
                  variant="filled"
                  placeholder="Enter first name"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message || " "}
                  className="w-[385px] form-control"
                  slotProps={{
                    input: {
                      inputProps: {
                        maxLength: 50,
                        onChange: validateAlphabet,
                      },
                    },
                  }}
                />
              </FormControl>
              <FormControl className="w-[385px] form-control">
                <TextField
                  disabled={isDisabled}
                  label="Last Name*"
                  variant="filled"
                  placeholder="Enter last name"
                  {...register("lastName", {
                    required: "Last Name is required",
                    minLength: {
                      value: 2,
                      message: "Value of input should be min two character",
                    },
                  })}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message || " "}
                  slotProps={{
                    input: {
                      inputProps: {
                        maxLength: 50,
                        onChange: validateAlphabet,
                      },
                    },
                  }}
                />
              </FormControl>
              <FormControl variant="filled" className="w-[385px] form-control">
                <InputLabel sx={{ color: errors.gender ? "#d32f2f" : "" }}>
                  Gender*
                </InputLabel>
                <Select
                  defaultValue=""
                  label="Gender*"
                  error={!!errors.gender}
                  {...register("gender", {
                    required: "Gender is required",
                  })}
                  onChange={handleSelectChange}
                  disabled={isDisabled}
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="მამრობითი">Male</MenuItem>
                  <MenuItem value="მდედრობითი">Female</MenuItem>
                </Select>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {errors.gender?.message || " "}
                </FormHelperText>
              </FormControl>
              <FormControl className="w-[385px] form-control">
                <TextField
                  disabled={isDisabled}
                  label="ID Number*"
                  variant="filled"
                  placeholder="Enter ID name"
                  {...register("privateNumber", {
                    required: "ID Numbers is required",
                    minLength: {
                      value: 11,
                      message: "ID number must be 11 characters",
                    },
                  })}
                  error={!!errors.privateNumber}
                  helperText={errors.privateNumber?.message || " "}
                  slotProps={{
                    input: {
                      inputProps: {
                        maxLength: 11,
                        onChange: allowOnlyNumbers,
                      },
                    },
                  }}
                />
              </FormControl>
              <FormControl className="w-[385px] form-control">
                <TextField
                  disabled={isDisabled}
                  label="Phone*"
                  variant="filled"
                  placeholder="Enter Phone number"
                  {...register("phone", {
                    required: "Phone is required",
                    minLength: {
                      value: 9,
                      message: "Phone number must be 9 characters",
                    },
                  })}
                  error={!!errors.phone}
                  helperText={errors.phone?.message || " "}
                  slotProps={{
                    input: {
                      inputProps: {
                        maxLength: 9,
                        inputMode: "numeric",
                        onChange: allowOnlyNumbers,
                      },
                    },
                  }}
                />
              </FormControl>
              <FormControl className="w-[385px] form-control">
                <TextField
                  disabled={isDisabled}
                  label="Address*"
                  variant="filled"
                  placeholder="Enter Address"
                  {...register("address", {
                    required: "Address is required",
                  })}
                  error={!!errors.address}
                  helperText={errors.address?.message || " "}
                />
              </FormControl>
              <Box className="flex flex-wrap gap-[20px] form-group">
                <FormControl className="w-[385px] form-control">
                  <TextField
                    disabled={isDisabled}
                    label="Legal Address Country*"
                    variant="filled"
                    placeholder="Enter Country"
                    {...register("legalAddressCountry", {
                      required: "Legal Address Country is required",
                    })}
                    error={!!errors.legalAddressCountry}
                    helperText={errors.legalAddressCountry?.message || " "}
                  />
                </FormControl>
                <FormControl className="w-[385px] form-control">
                  <TextField
                    disabled={isDisabled}
                    label="Legal Address City*"
                    variant="filled"
                    placeholder="Enter City"
                    {...register("legalAddressCity", {
                      required: "Legal Address City is required",
                    })}
                    error={!!errors.legalAddressCity}
                    helperText={errors.legalAddressCity?.message || " "}
                  />
                </FormControl>
                <FormControl className="w-[385px] form-control">
                  <TextField
                    disabled={isDisabled}
                    label="Legal Address Street*"
                    variant="filled"
                    placeholder="Enter Street"
                    {...register("legalAddressStreet", {
                      required: "Legal Address Street is required",
                    })}
                    error={!!errors.legalAddressStreet}
                    helperText={errors.legalAddressStreet?.message || " "}
                  />
                </FormControl>
              </Box>
              <Box className="flex flex-wrap gap-[20px] form-group">
                <FormControl className="w-[385px] form-control">
                  <TextField
                    disabled={isDisabled}
                    label="Factual Address Country*"
                    variant="filled"
                    placeholder="Enter Country"
                    {...register("factualAddressCountry", {
                      required: "Factual Address Country is required",
                    })}
                    error={!!errors.factualAddressCountry}
                    helperText={errors.factualAddressCountry?.message || " "}
                  />
                </FormControl>
                <FormControl className="w-[385px] form-control">
                  <TextField
                    disabled={isDisabled}
                    label="Factual Address City*"
                    variant="filled"
                    placeholder="Enter City"
                    {...register("factualAddressCity", {
                      required: "Factual Address City is required",
                    })}
                    error={!!errors.factualAddressCity}
                    helperText={errors.factualAddressCity?.message || " "}
                  />
                </FormControl>
                <FormControl className="w-[385px] form-control">
                  <TextField
                    disabled={isDisabled}
                    label="Factual Address Street*"
                    variant="filled"
                    placeholder="Enter Street"
                    {...register("factualAddressStreet", {
                      required: "Factual Address Street is required",
                    })}
                    error={!!errors.factualAddressStreet}
                    helperText={errors.factualAddressStreet?.message || " "}
                  />
                </FormControl>
              </Box>
            </Box>
            <Box className="flex gap-[20px] pt-[25px] button-container">
              {!isDisabled ? (
                <>
                  <Button
                    type="submit"
                    variant="contained"
                    className="!bg-[#04a2e1]"
                  >
                    Submit
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={handleDisableToggle}
                    className="!bg-[#f44336]"
                  >
                    Cancel Modification
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  variant="contained"
                  onClick={handleDisableToggle}
                  className="!bg-[#04a2e1]"
                >
                  Modify
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
