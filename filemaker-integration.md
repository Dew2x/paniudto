# FileMaker Pro Integration Guide
## Paniudto Restaurant Database System

### Overview
This guide explains how to integrate your FileMaker Pro database with the Paniudto website using JSON files as the data exchange format. The system allows bidirectional synchronization between FileMaker Pro and your GitHub-hosted website.

### Architecture
```
FileMaker Pro → JSON Export → GitHub Repository → Website
                    ↑                              ↓
              JSON Import ←── GitHub Webhook ←── User Actions
```

### FileMaker Pro Setup

#### 1. Database Structure
Create tables in FileMaker Pro that match the JSON structure:

**Users Table:**
- `id` (Number, Auto-increment)
- `username` (Text)
- `password` (Text)
- `email` (Text)
- `created_at` (Timestamp)
- `last_login` (Timestamp)
- `role` (Text: "user" or "admin")

**Dishes Table:**
- `id` (Number, Auto-increment)
- `name` (Text)
- `description` (Text)
- `price` (Text, display format)
- `price_numeric` (Number)
- `image` (Text, file path)
- `fallback_emoji` (Text)
- `category` (Text)
- `available` (Number, 0 or 1)
- `ingredients` (Text, comma-separated)
- `allergens` (Text, comma-separated)
- `spice_level` (Text)
- `prep_time` (Number, minutes)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

**Orders Table:**
- `id` (Number, Auto-increment)
- `user_id` (Number, foreign key)
- `items` (Text, JSON format)
- `total_amount` (Number)
- `status` (Text)
- `created_at` (Timestamp)

#### 2. JSON Export Script
Create a FileMaker Pro script called "Export to JSON":

```applescript
# Export Users
Go to Layout ["Users"]
Show All Records
Export Records [File Name: "users.json"; Format: "JSON"]

# Export Dishes
Go to Layout ["Dishes"]
Show All Records
Export Records [File Name: "dishes.json"; Format: "JSON"]

# Export Orders
Go to Layout ["Orders"]
Show All Records
Export Records [File Name: "orders.json"; Format: "JSON"]

# Export Settings
Go to Layout ["Settings"]
Show All Records
Export Records [File Name: "settings.json"; Format: "JSON"]
```

#### 3. JSON Import Script
Create a FileMaker Pro script called "Import from JSON":

```applescript
# Import Users
Go to Layout ["Users"]
Import Records [File Name: "users.json"; Format: "JSON"; Method: "Update matching records"]

# Import Dishes
Go to Layout ["Dishes"]
Import Records [File Name: "dishes.json"; Format: "JSON"; Method: "Update matching records"]

# Import Orders
Go to Layout ["Orders"]
Import Records [File Name: "orders.json"; Format: "JSON"; Method: "Update matching records"]
```

### GitHub Integration

#### 1. Repository Structure
```
your-repo/
├── data/
│   ├── users.json
│   ├── dishes.json
│   ├── orders.json
│   └── settings.json
├── js/
│   └── database.js
├── filemaker-scripts/
│   ├── export-to-json.fmp12
│   └── import-from-json.fmp12
└── sync-logs/
    └── sync-log.json
```

#### 2. Automated Sync Workflow
Create a GitHub Action (`.github/workflows/filemaker-sync.yml`):

```yaml
name: FileMaker Pro Sync
on:
  schedule:
    - cron: '*/5 * * * *'  # Every 5 minutes
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Check for changes
        id: changes
        run: |
          echo "::set-output name=changed::$(git diff --name-only HEAD~1 data/)"
      
      - name: Trigger FileMaker Sync
        if: steps.changes.outputs.changed
        run: |
          curl -X POST "${{ secrets.FILEMAKER_WEBHOOK_URL }}" \
            -H "Content-Type: application/json" \
            -d '{"action": "sync", "files": "${{ steps.changes.outputs.changed }}"}'
```

### Website Integration

#### 1. Database Class Usage
The website uses the `PaniudtoDatabase` class for all data operations:

```javascript
// Initialize database
const db = new PaniudtoDatabase();

// User operations
const users = await db.getUsers();
const user = await db.getUserByUsername('student');
await db.addUser({username: 'newuser', password: 'pass123'});

// Dish operations
const dishes = await db.getDishes();
const dish = await db.getDishById(1);
await db.updateDish(1, {available: false});

// Order operations
await db.addOrder({user_id: 1, items: [...], total_amount: 500});
```

#### 2. Sync Status Monitoring
The system provides sync status through the browser console:

```javascript
// Check sync logs
const logs = JSON.parse(localStorage.getItem('paniudto_sync_logs') || '[]');
console.log('Pending sync items:', logs.filter(l => l.sync_required));

// Manual sync trigger
await window.PaniudtoDB.syncWithFileMaker();
```

### FileMaker Pro Button Scripts

#### Button 1: Export Data to GitHub
```applescript
# Button: "Sync to Website"
Perform Script ["Export to JSON"]
Set Variable [$result; Value: "Success"]
Show Custom Dialog ["Sync Status"; "Data exported successfully. Changes will appear on website within 5 minutes."]
```

#### Button 2: Import Data from GitHub
```applescript
# Button: "Get Website Data"
Perform Script ["Import from JSON"]
Set Variable [$result; Value: "Success"]
Show Custom Dialog ["Import Status"; "Website data imported successfully."]
Refresh Window
```

#### Button 3: Two-Way Sync
```applescript
# Button: "Full Sync"
Perform Script ["Export to JSON"]
# Wait for export to complete
Pause/Resume Script [Duration (seconds): 2]
Perform Script ["Import from JSON"]
Show Custom Dialog ["Sync Complete"; "Two-way sync completed successfully."]
```

### Data Format Examples

#### users.json
```json
{
  "users": [
    {
      "id": 1,
      "username": "student",
      "password": "password123",
      "email": "student@paniudto.com",
      "created_at": "2024-01-01T00:00:00Z",
      "last_login": "2024-01-15T10:30:00Z",
      "role": "user"
    }
  ],
  "last_updated": "2024-01-15T10:30:00Z",
  "version": "1.0"
}
```

#### dishes.json
```json
{
  "dishes": [
    {
      "id": 1,
      "name": "Kinilaw na Tuna",
      "description": "Fresh tuna cured in vinegar and calamansi...",
      "price": "₱280",
      "price_numeric": 280,
      "image": "images/kinilaw-tuna.jpg",
      "fallback_emoji": "🐟",
      "category": "seafood",
      "available": true,
      "ingredients": ["tuna", "vinegar", "calamansi"],
      "allergens": ["fish"],
      "spice_level": "mild",
      "prep_time": 15,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "categories": ["seafood", "soup", "fusion"],
  "last_updated": "2024-01-15T10:30:00Z",
  "version": "1.0"
}
```

### Security Considerations

1. **Password Hashing**: In production, hash passwords before storing
2. **API Authentication**: Use secure tokens for FileMaker-GitHub communication
3. **Data Validation**: Validate all incoming data before processing
4. **Access Control**: Restrict GitHub repository access to authorized users

### Troubleshooting

#### Common Issues:

1. **JSON Export Fails**
   - Check FileMaker Pro field mapping
   - Verify export permissions
   - Ensure all required fields are present

2. **Sync Not Working**
   - Check GitHub Actions logs
   - Verify webhook URLs
   - Test network connectivity

3. **Data Conflicts**
   - Implement conflict resolution rules
   - Use timestamps to determine latest changes
   - Create backup before sync operations

#### Debug Commands:

```javascript
// Check database status
console.log('Database online:', window.PaniudtoDB.isOnline);

// View sync logs
console.table(JSON.parse(localStorage.getItem('paniudto_sync_logs')));

// Test database connection
window.PaniudtoDB.loadData('users').then(console.log).catch(console.error);
```

### Implementation Checklist

- [ ] Create FileMaker Pro database with matching structure
- [ ] Set up JSON export/import scripts
- [ ] Create GitHub repository with data folder
- [ ] Deploy website with database integration
- [ ] Configure GitHub Actions for automated sync
- [ ] Test FileMaker Pro buttons
- [ ] Verify two-way data synchronization
- [ ] Set up monitoring and logging
- [ ] Document user workflows
- [ ] Train users on the system

### Next Steps

1. **Phase 1**: Basic JSON export/import
2. **Phase 2**: Real-time sync with webhooks
3. **Phase 3**: Conflict resolution and versioning
4. **Phase 4**: Advanced features (backup, analytics)

### Support

For technical support:
- Check the GitHub repository issues
- Review sync logs in browser console
- Test individual components separately
- Contact the development team

---

**Note**: This is a student project demonstration. For production use, implement proper security measures, error handling, and data validation.
