import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedDataAsync, selectFeedData, updateFeedData  } from '../redux/quiz/quizSlice';

import { useNavigate } from "react-router";
import { PhotoUploadResult } from "../utils/Types";
import {
  FeedPost,
  PhotoFeedPost,
  ApiResponse,
  ProjectTextAreaPros,
  formatBiography,
} from "../utils/Types";
import "./CreatePost.css";
import Alert from "../UI/Alert";
import AddPhoto from "./AddPhoto";
import { fetchFeed, submitPhototo, submitPosto } from "../api/api";

interface FormData1 {
  post_type: string;
  tagged_friends: (number | null)[];
  category: string;
  name: string;
  biography: string;
  impact: string;
  notify_nominee: string;
  add_project: string;
  project: string;
  user_status: string;
  privacy: number;
}
function ProjectTextArea({ addProject, onChange }: ProjectTextAreaPros) {
  if (addProject === "yes") {
    return (
      <div className="mb-3">
        <label htmlFor="project" className="form-label">
          Project
        </label>
        <textarea
          className="form-control"
          id="project"
          name="project"
          onChange={onChange}
        ></textarea>
      </div>
    );
  }

  console.log("addProject", addProject);

  return null;
}

const CreatePost = () => {
    const dispatch = useDispatch();
    const feedData = useSelector(selectFeedData);
  const navigate = useNavigate();
  const [showPhotoPreviewer, setShowPhotoPreviewer] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [alert, setAlert] = useState<{ message: string; type: string } | null>(
    null
  ); // State for displaying alerts

  useEffect(() => {
    dispatch(fetchFeedDataAsync());

    
  }, [dispatch]);

  const [formData, setFormData] = useState<FormData1>({
    post_type: "activity_post",
    tagged_friends: [null],
    category: "Academic leader",
    name: "",
    biography: "",
    impact: "",
    notify_nominee: "no",
    add_project: "no",
    project: "",
    user_status: "",
    privacy: 4,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void => {
    const { name, value, type } = e.target;

    if (
      type === "radio" &&
      (name === "add_project" || name === "notify_nominee")
    ) {
      setFormData({ ...formData, [name]: value === "yes" ? "yes" : "no" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  function BiographyTextArea({
    showBiography,
    onChange,
  }: {
    showBiography: boolean;
    onChange: (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => void;
  }) {
    if (showBiography) {
      return (
        <div className="mb-3">
          <label htmlFor="biography" className="form-label">
            Nominee's biography
          </label>
          <textarea
            className="form-control"
            id="biography"
            name="biography"
            onChange={onChange}
            required
          ></textarea>
        </div>
      );
    }

    return null;
  }

  const validateForm = () => {
    if (!formData.name) {
      setAlert({ message: "name invalid", type: "error" });
      console.log("name invalid");
      return false;
    }

    if (!formData.impact) {
      setAlert({ message: "Impact invalid required", type: "error" });
      return false;
    }

    if (!formData.biography) {
      setAlert({ message: "Biography invalid", type: "error" });
      return false;
    }

    if (formData.add_project === "yes" && !formData.project.trim()) {
      setAlert({ message: "project invalid", type: "error" });
      return false;
    }

    return true;
  };

  const submitPhoto = async (): Promise<PhotoUploadResult | null> => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("name", "file");
      formData.append("type", "photo");
      formData.append("item_type", "photo");
      formData.append("file_type", "photo");
      formData.append("id", "-1"); // Add the ID here
      formData.append("photo_type", "photo"); // Add the type here

      const response = await submitPhototo(formData, "multipart/form-data");
      return response;
    }
    return null;
  };

  const submitPost = async (payload: FeedPost | PhotoFeedPost) => {
    console.log("Payload:", payload);
    const response = await submitPosto(payload);
    console.log("API Response:", response);
    return response?.data;
  };

  const formatUserStatus = () => {
    const project =
      formData.add_project === "yes"
        ? `<p class="card-text"><span class="fw-bold">Project:</span> ${formData.project}</p>`
        : "";
    return `<h5 class="card-title"><strong>${formData.name}</strong></h5>
                <p class="card-text"><span class="fw-bold">Category:</span> ${
                  formData.category
                }</p>
                <p class="card-text"><span class="fw-bold">Impact:</span> ${
                  formData.impact
                }</p>
                <p class="card-text"><span class="fw-bold">Biography:</span> ${formatBiography(
                  formData.biography
                )}</p>
                ${project}`;
  };

  const getPayload = (photoResult: PhotoUploadResult | null) => {
    console.log("photoResult", photoResult);
    if (photoResult) {
      return {
        post_type: "photo_set",
        privacy: formData.privacy,
        photo_files: [
          {
            id: photoResult.data.temp_file,
            type: photoResult.data.item_type,
            status: "new",
            text: "",
            tagged_friends: [],
          },
        ],
        photo_description: formatUserStatus(),
      } as PhotoFeedPost;
    }

    return {
      user_status: formatUserStatus(),
      privacy: formData.privacy,
      post_type: formData.post_type,
    } as FeedPost;
  };
  
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
  
    try {
      const photoResult = await submitPhoto();
      const payload: FeedPost | PhotoFeedPost = getPayload(photoResult);
      const response = await submitPost(payload);
      setAlert({
        message: "Post created successfully",
        type: "success",
      });
  
      if (payload.post_type === "photo_set") {
        (payload as PhotoFeedPost).photo_files[0].text = photoResult?.url || "";
      }
  
      // Concatenate the new payload with the existing feed data
      if (feedData) {
        const newFeedData = { data: [payload, ...feedData.data] }; // Wrap the array with a 'data' property
        console.log(newFeedData, "See the NEW DATA");
        
        // Update the feed data in Redux store
        dispatch(updateFeedData(newFeedData)); 
  
        // Store only the 'data' array in localStorage
        window.localStorage.setItem("feed", JSON.stringify(newFeedData.data));
      }
  
      navigate("/");
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };
  


  return (
    <div className="create-post-container py-4">
            <h1 className="create-post-heading">Post Categories</h1>
    <form onSubmit={handleSubmit}>
        {/* Privacy */}
        <div className="mb-3">
          <label htmlFor="privacy" className="form-label">
            Privacy
          </label>
          <select
            className="form-select"
            name="privacy"
            onChange={handleChange}
            value={formData.privacy}
          >
            <option value="0">Public</option>
            <option value="1">Community</option>
            <option value="2">Friends</option>
            <option value="3">Friends of Friends</option>
            <option value="4">Only Me</option>
          </select>
        </div>

        {/* Category */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            name="category"
            onChange={handleChange}
            value={formData.category}
          >
            <option value="Academic leader">Academic leader</option>
            <option value="Professor">Professor</option>
          </select>
        </div>

        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            required
            onChange={handleChange}
          />
        </div>

        {/* Biography */}
        <div className="mb-3">
          <label htmlFor="biography" className="form-label">
            Nominee's biography
          </label>
          <textarea
            className="form-control"
            id="biography"
            name="biography"
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Impact */}
        <div className="mb-3">
          <label htmlFor="impact" className="form-label">
            Nominee's impact
          </label>
          <textarea
            className="form-control"
            id="impact"
            name="impact"
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Add project */}
        <div className="row mb-3">
          <div className="col">Add project:</div>
          <div className="col form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="add_project"
              id="add-project"
              value="yes"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="add-project">
              Yes
            </label>
          </div>
          <div className="col form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="add_project"
              id="do-not-add-project"
              value="no"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="do-not-add-project">
              No
            </label>
          </div>
        </div>

        {/* Project Text Area */}
        <ProjectTextArea
          addProject={formData.add_project}
          onChange={handleChange}
        />

        {/* Add Photo button */}

        {/* Photo Previewer */}

        <AddPhoto setSelectedFile={setSelectedFile} />

        {/* Submit button */}
        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
