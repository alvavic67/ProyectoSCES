package com.example.qrmata.Interfaces;

import com.example.qrmata.Models.Contact;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface GetAPI {
    @GET("getUser")
    Call<Contact> getUser(@Body Contact contact);
}
