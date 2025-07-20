package com.ai.SpringAiDemo;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class IndianMealService {

    private final ChatModel chatModel;

    public IndianMealService(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public String createIndianMealPlan(String dietType, String calorieGoal, String restrictions, String duration) {
        String template = """
                I want a simple and healthy INDIAN meal plan.
                
                ✅ Diet Type: {dietType} (e.g., vegetarian, non-vegetarian)
                ✅ Daily Calorie Goal: {calorieGoal}
                ✅ Dietary Restrictions: {restrictions} (e.g., no dairy, no gluten, etc.)
                ✅ Duration: {duration} (e.g., 1 day, 7 days)
                
                Please follow these rules:
                - Keep meals simple, homely, and affordable (no fancy restaurant-style dishes).
                - Use common Indian ingredients like dal, rice, roti, vegetables, paneer, etc.
                - Provide 3 main meals (breakfast, lunch, dinner) + 2 light snacks each day.
                - Include approximate calories for each meal.
                - Add 1–2 lines about nutritional benefits.
                - Avoid giving long complicated recipes. Just keep it short and practical.
                
                Now create a simple meal plan.
                """;

        PromptTemplate promptTemplate = new PromptTemplate(template);

        Map<String, Object> params = Map.of(
                "dietType", dietType,
                "calorieGoal", calorieGoal,
                "restrictions", restrictions,
                "duration", duration
        );

        Prompt prompt = promptTemplate.create(params);

        return chatModel.call(prompt).getResult().getOutput().getText();
    }
}
