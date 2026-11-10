export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];
type Relationship = { foreignKeyName: string; columns: string[]; isOneToOne: boolean; referencedRelation: string; referencedColumns: string[] };
type Table<Row, Insert, Update, Relationships extends Relationship[] = []> = { Row: Row; Insert: Insert; Update: Update; Relationships: Relationships };

type ProfileRow = { id: string; full_name: string; preferred_language: string; role: Database["public"]["Enums"]["app_role"]; created_at: string; updated_at: string };
type BatchRow = { id: string; name: string; description: string; status: Database["public"]["Enums"]["batch_status"]; trainer_id: string; starts_on: string | null; ends_on: string | null; capacity: number; created_at: string };
type LessonRow = { id: string; day_number: number; title_en: string; title_hi: string; summary_en: string; summary_hi: string; content_en: string; content_hi: string; stage: string; published: boolean; created_at: string; updated_at: string };
type LessonProgressRow = { id: string; learner_id: string; lesson_id: string; completed: boolean; completed_at: string | null };

export type Database = {
  public: {
    Tables: {
      profiles: Table<ProfileRow,
        { id: string; full_name?: string; preferred_language?: string; role?: Database["public"]["Enums"]["app_role"] },
        { full_name?: string; preferred_language?: string; role?: Database["public"]["Enums"]["app_role"]; updated_at?: string }>;
      batches: Table<BatchRow,
        { id?: string; name: string; description?: string; status?: Database["public"]["Enums"]["batch_status"]; trainer_id: string; starts_on?: string | null; ends_on?: string | null; capacity?: number },
        { name?: string; description?: string; status?: Database["public"]["Enums"]["batch_status"]; trainer_id?: string; starts_on?: string | null; ends_on?: string | null; capacity?: number }>;
      batch_memberships: Table<
        { id: string; batch_id: string; learner_id: string; joined_at: string },
        { id?: string; batch_id: string; learner_id: string },
        { batch_id?: string; learner_id?: string },
        [{ foreignKeyName: "batch_memberships_batch_id_fkey"; columns: ["batch_id"]; isOneToOne: false; referencedRelation: "batches"; referencedColumns: ["id"] }]>;
      lessons: Table<LessonRow,
        { id?: string; day_number: number; title_en: string; title_hi: string; summary_en?: string; summary_hi?: string; content_en?: string; content_hi?: string; stage?: string; published?: boolean },
        { day_number?: number; title_en?: string; title_hi?: string; summary_en?: string; summary_hi?: string; content_en?: string; content_hi?: string; stage?: string; published?: boolean }>;
      lesson_progress: Table<LessonProgressRow,
        { id?: string; learner_id: string; lesson_id: string; completed?: boolean; completed_at?: string | null },
        { learner_id?: string; lesson_id?: string; completed?: boolean; completed_at?: string | null },
        [
          { foreignKeyName: "lesson_progress_learner_id_fkey"; columns: ["learner_id"]; isOneToOne: false; referencedRelation: "profiles"; referencedColumns: ["id"] },
          { foreignKeyName: "lesson_progress_lesson_id_fkey"; columns: ["lesson_id"]; isOneToOne: false; referencedRelation: "lessons"; referencedColumns: ["id"] }
        ]>;
      exercise_results: Table<
        { id:string; learner_id:string; lesson_id:string; exercise_key:string; status:"started"|"submitted"|"passed"|"needs_revision"; submission_text:string; submission_url:string|null; feedback:string; created_at:string; updated_at:string },
        { id?:string; learner_id:string; lesson_id:string; exercise_key:string; submission_text?:string; submission_url?:string|null },
        { status?:"started"|"submitted"|"passed"|"needs_revision"; submission_text?:string; submission_url?:string|null; feedback?:string }
      >;
    };
    Views: { [_ in never]: never };
    Functions: {
      list_open_batches: {
        Args: Record<PropertyKey, never>;
        Returns: { id: string; name: string; capacity: number; status: Database["public"]["Enums"]["batch_status"]; enrolled_count: number }[];
      };
      submit_quiz_attempt: {
        Args: { p_quiz_id: string; p_answers: Json };
        Returns: Json;
      };
      mark_lesson_complete: {
        Args: { p_lesson_id: string };
        Returns: boolean;
      };
    };
    Enums: { app_role: "learner" | "trainer" | "admin"; batch_status: "upcoming" | "active" | "completed"; submission_status: "submitted" | "reviewing" | "approved" | "revision_requested" };
    CompositeTypes: { [_ in never]: never };
  };
};
