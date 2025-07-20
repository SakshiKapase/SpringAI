package com.ai.SpringAiDemo;


import org.springframework.web.bind.annotation.*;


import jakarta.servlet.http.HttpServletResponse;
import org.springframework.ai.image.ImageResponse;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")  // ✅ applies to ALL methods

public class MainController {

    private final ChatService chatService;
    private final ImageService imageService;
    private final IndianMealService indianMealService;

    public MainController(ChatService chatService, ImageService imageService, IndianMealService indianMealService) {
        this.chatService = chatService;
        this.imageService = imageService;
        this.indianMealService = indianMealService;
    }


    //chat getmapping
    @GetMapping("ask-ai")
    public String getResponse(@RequestParam String prompt) {
        return chatService.getResponse(prompt);
    }


    //chat options getmapping
    @GetMapping("ask-ai-options")
    public String getResponseOptions(@RequestParam String prompt) {
        return chatService.getResponseOptions(prompt);
    }

//    @GetMapping("generate-image")
//    public ImageResponse generateImage(HttpServletResponse response, @RequestParam String prompt) throws IOException {
//        ImageResponse imageResponse = imageService.generateImage(prompt);
//        String imageUrl = imageResponse.getResult().getOutput().getUrl();
//        response.sendRedirect(imageUrl);
//    }


    @GetMapping("generate-image")
    public List<String> generateImage(HttpServletResponse response,
                                      @RequestParam String prompt,
                                      @RequestParam(defaultValue="hd") String quality,
                                      @RequestParam(defaultValue="1") int n,
                                      @RequestParam(defaultValue="1024") int width,
                                      @RequestParam(defaultValue="1024") int height) throws IOException
    {
        ImageResponse imageResponse = imageService.generateImage(prompt,quality,n,width,height);

        //streams to get image urls from ImageResponse
        List<String> imageUrls = imageResponse.getResults().stream()
                .map(result->result.getOutput().getUrl())
                .toList();
        return imageUrls;
    }



//    @GetMapping("/recipe-creator")
//    public String recipeCreator(
//            @RequestParam String ingredients,
//            @RequestParam(defaultValue = "any") String cuisine,
//            @RequestParam(defaultValue = "none") String dietaryRestrictions
//    ) {
//        return recipeService.createRecipe(ingredients, cuisine, dietaryRestrictions);
//    }

    @GetMapping("/indian-meal-plan")
    public String getIndianMealPlan(
            @RequestParam(defaultValue = "vegetarian") String dietType,
            @RequestParam(defaultValue = "1500 kcal/day") String calorieGoal,
            @RequestParam(defaultValue = "none") String restrictions,
            @RequestParam(defaultValue = "3 days") String duration
    ) {
        return indianMealService.createIndianMealPlan(dietType, calorieGoal, restrictions, duration);
    }


}
