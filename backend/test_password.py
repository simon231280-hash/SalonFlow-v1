from app.core.security import verify_password

hashed = "$argon2id$v=19$m=65536,t=3,p=4$iYwXfDUH2ajaWb1AWWHC3w$rMLxA73Codd4hZGo47DOZLLuRzNLs3NBSDwGoTzteqc"

print(verify_password("stringst", hashed))
